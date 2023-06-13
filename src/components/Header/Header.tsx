'use client';
import { useAppDispatch } from '@/store/hooks';
import styles from './Header.module.scss';
import { useEffect } from 'react';
import { setAllCards, setShowedItems } from '@/store/entities/cards/reducer';
import { getLocalItem, setLocalItem } from '@/localApi/localApi';
import { INITIAL_CARDS } from '@/localApi/localStorageKeys';
import { ICard, IItems } from '@/store/entities/cards/types';
import ButtonFile from '../ButtonFile/ButtonFile';

export default function Header() {
  const dispatch = useAppDispatch();

  const getItemsFromCards = (cards: ICard[]) => {
    if (cards) {
      return cards.reduce((acc, curCard) => {
        return acc.concat(curCard.items);
      }, [] as IItems[]);
    } else {
      return [];
    }
  };

  const mapCards = (innerCards: string): ICard[] => {
    const parsedJSON = JSON.parse(innerCards);

    return parsedJSON.map((check: Record<string, any>) => {
      const receipt = check.ticket.document.receipt;
      const items = check.ticket.document.receipt.items.map((item: any) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        sum: item.sum,
        date: receipt.dateTime,
      }));
      return {
        id: check._id,
        commonInfo: {
          createdAt: check.createdAt,
          dateTime: receipt.dateTime,
          retailPlaceAddress: receipt.retailPlace,
          totalSum: receipt.totalSum,
          userInn: receipt.userInn,
        },
        items,
      };
    });
  };

  const onChangeFiles = (files: File[]): void => {
    let filesArr: File[] = [];
    if (files) {
      filesArr = Array.from(files);
    }

    let resultArrCards: ICard[] = [];

    filesArr.forEach((file, index) => {
      const reader = new FileReader();

      reader.onload = function () {
        if (typeof reader.result === 'string') {
          resultArrCards = [...resultArrCards, ...mapCards(reader.result)];
        }

        if (index === filesArr.length - 1) {
          dispatch(setAllCards(resultArrCards));
          setLocalItem(INITIAL_CARDS, JSON.stringify(resultArrCards));
          dispatch(setShowedItems(getItemsFromCards(resultArrCards)));
        }
      };

      reader.onerror = function () {
        console.log(`Ошибка чтения файла => ${file.name}`);
      };

      reader.readAsText(file);
    });
  };

  useEffect(() => {
    const initialCards = getLocalItem(INITIAL_CARDS);

    if (initialCards) {
      // const resultCards = mapCards(initialCards);
      const parsedInitialCards = JSON.parse(initialCards);
      dispatch(setAllCards(parsedInitialCards));
      dispatch(setShowedItems(getItemsFromCards(parsedInitialCards)));
    }
  }, []);

  return (
    <header className={styles.root}>
      <p>
        Мои чеки онлайн. Сервис для работы с чеками. Для начала работы нужно получить JSON файл. JSON файл можно
        получить и приложения Мои чеки. Приложения позволяет быстро фильтровать чеки по общей информации или позиции в
        чеках. В будущем планируется возможность строить график по найденным позициям{' '}
      </p>
      <ButtonFile
        uniqId={'uploadJson'}
        text={'Загрузить JSON'}
        changeValueInput={onChangeFiles}
        multiple
        accept="application/JSON"
      />
    </header>
  );
}
