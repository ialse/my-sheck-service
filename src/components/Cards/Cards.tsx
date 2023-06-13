'use client';

import { useSelector } from 'react-redux';
import styles from './Cards.module.scss';
import { selectMode, selectShowedCards, selectShowedItems } from '@/store/entities/cards/selectors';
import Card from '../Card/Card';
import ItemCheck from '../ItemCheck/ItemCheck';
import { ModeCards } from '@/store/entities/cards/types';
import { useAppDispatch } from '@/store/hooks';
import { resetSearchedText, setInitialCards, setModeCards } from '@/store/entities/cards/reducer';
import MultiSwitcher from '../MultiSwicther/MultiSwitcher';
import SearchField from '../SearchField/SearchField';

export default function Cards() {
  const dispatch = useAppDispatch();
  const showedCards = useSelector(selectShowedCards);
  const showedItems = useSelector(selectShowedItems);
  const mode = useSelector(selectMode);

  const isModeChecks = mode === ModeCards.Checks;

  const handleChangeSwitcher = (code: ModeCards): void => {
    dispatch(resetSearchedText());
    dispatch(setModeCards(code));
    dispatch(setInitialCards());
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        {isModeChecks ? (
          <div>
            <p>Количество чеков: {showedCards?.length}</p>
            <p>Количество позиций в чеках: {showedCards?.reduce((acc, card) => acc + card.items.length, 0)}</p>
          </div>
        ) : (
          <div>
            <p>Количество позиций: {showedItems?.length}</p>
          </div>
        )}
        <SearchField />
        <MultiSwitcher<ModeCards>
          id="switcherChecks"
          defaultValue={{ code: mode, name: 'Чеки' }}
          items={[
            { code: ModeCards.Checks, name: 'Чеки' },
            { code: ModeCards.Items, name: 'Позиции' },
          ]}
          onChange={handleChangeSwitcher}
        />
      </div>
      {isModeChecks &&
        showedCards?.map((card) => {
          return <Card key={card.id} card={card} />;
        })}
      {!isModeChecks && (
        <div className={styles.items}>
          <div className={styles.item}>
            <p>Товар</p>
            <p>Количество</p>
            <p>Стоимость</p>
            <p>Дата</p>
          </div>
          {showedItems?.map((item, index) => {
            return <ItemCheck key={index} itemCheck={item} />;
          })}
        </div>
      )}
    </div>
  );
}
