import { SyntheticEvent, useEffect } from 'react';
import styles from './SearchField.module.scss';
import { useAppDispatch } from '@/store/hooks';
import { filterCardsBySearchedText, filterItemsBySearchedText } from '@/store/entities/cards/asyncActions';
import {
  resetSearchedText,
  setInitialCards,
  setInitialItems,
  setSearchedText,
  setShowedCards,
} from '@/store/entities/cards/reducer';
import { useSelector } from 'react-redux';
import { selectAllCards, selectAllItems, selectMode, selectSearchedText } from '@/store/entities/cards/selectors';
import { ModeCards } from '@/store/entities/cards/types';

export default function SearchField() {
  const dispatch = useAppDispatch();
  const allCards = useSelector(selectAllCards);
  const allItems = useSelector(selectAllItems);
  const mode = useSelector(selectMode);
  const searchedText = useSelector(selectSearchedText);

  const handleChangeFilter = (e: SyntheticEvent<HTMLInputElement>) => {
    dispatch(setSearchedText(e.currentTarget.value));
  };

  const handleResetButton = (): void => {
    dispatch(resetSearchedText());
    dispatch(setShowedCards(allCards));
  };

  useEffect(() => {
    if (searchedText.length > 2) {
      if (mode === ModeCards.Checks) {
        dispatch(filterCardsBySearchedText(searchedText));
      } else {
        dispatch(filterItemsBySearchedText(searchedText));
      }
    } else {
      if (mode === ModeCards.Checks) {
        dispatch(setInitialCards());
      } else {
        dispatch(setInitialItems());
      }
    }
  }, [searchedText, dispatch]);

  return (
    <div className={styles.root}>
      <input
        type="text"
        className={styles.field}
        placeholder={`Фильтр по ${mode === ModeCards.Checks ? 'чекам' : 'позициям'}`}
        value={searchedText}
        onChange={handleChangeFilter}
      />
      <button className={styles.resetButton} onClick={handleResetButton}>
        +
      </button>
    </div>
  );
}
