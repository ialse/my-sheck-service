'use client';
import { useAppDispatch } from '@/store/hooks';
import styles from './Header.module.scss';
import { useEffect } from 'react';
import { setAllCards, setShowedItems } from '@/store/entities/cards/reducer';
import { getLocalItem, setLocalItem } from '@/localApi/localApi';
import { INITIAL_CARDS } from '@/localApi/localStorageKeys';
import { ICard } from '@/store/entities/cards/types';
import ButtonFile from '../ButtonFile/ButtonFile';
import { mapCards } from '@/utils/mapCards';
import { getItemsFromCards } from '@/utils/getItemsFromCards';

export default function Header() {
  const dispatch = useAppDispatch();

  const onChangeFiles = async (files: File[]): Promise<void> => {
    let filesArr: File[] = [];
    if (files) {
      filesArr = Array.from(files);
    }

    const cardArr = filesArr.map<Promise<ICard[]>>((file, index) => {
      const reader = new FileReader();

      return new Promise((resolve) => {
        reader.onload = function () {
          if (typeof reader.result === 'string') {
            resolve(mapCards(reader.result));
          }
        };

        reader.onerror = function () {
          console.log(`Ошибка чтения файла => ${file.name}`);
        };

        reader.readAsText(file);
      });
    });

    const mappedCards = (await Promise.all(cardArr)).flat();
    // сортировка по дате чека
    const sortedCards = mappedCards.sort(
      (a, b) => new Date(b.commonInfo.dateTime).getTime() - new Date(a.commonInfo.dateTime).getTime()
    );

    dispatch(setAllCards(sortedCards));
    setLocalItem(INITIAL_CARDS, JSON.stringify(sortedCards));
    dispatch(setShowedItems(getItemsFromCards(sortedCards)));
  };

  useEffect(() => {
    const initialCards = getLocalItem(INITIAL_CARDS);

    if (initialCards) {
      const parsedInitialCards = JSON.parse(initialCards);
      dispatch(setAllCards(parsedInitialCards));
      dispatch(setShowedItems(getItemsFromCards(parsedInitialCards)));
    }
  }, []);

  return (
    <header className={styles.root}>
      <div>
        <p>
          Мои чеки онлайн. Сервис для работы с чеками. Для начала работы нужно импортировать JSON файл. JSON файл можно
          получить из мобильного приложения Мои чеки. Можно импортировать Одновремнно несколько JSON, чеки будут
          осортированы по дате
        </p>
        <p>
          Приложения позволяет быстро фильтровать чеки по общей информации или позиции в чеках. В будущем планируется
          возможность строить график по найденным позициям
        </p>
      </div>
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
