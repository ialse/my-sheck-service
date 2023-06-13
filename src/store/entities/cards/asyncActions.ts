import { Dispatch } from '@reduxjs/toolkit';
import { RootReducer } from '@/store/rootReducer';
import { setShowedCards, setShowedItems } from './reducer';
import { CardsAction, IItems } from './types';

export function filterCardsBySearchedText(searchedText: string) {
  return (dispatch: Dispatch<CardsAction>, getState: () => RootReducer) => {
    const allCards = getState().cards.allCards;

    if (allCards) {
      const filteredCards = allCards.filter((card) => {
        return Object.values(card.commonInfo).some((item: string | number) => {
          return item.toString().toLowerCase().includes(searchedText.toLowerCase());
        });
      });

      dispatch(setShowedCards(filteredCards));
    }
  };
}

export function filterItemsBySearchedText(searchedText: string) {
  return (dispatch: Dispatch<CardsAction>, getState: () => RootReducer) => {
    const allCards = getState().cards.allCards;

    if (allCards) {
      const allItems = allCards.reduce((acc, curCard) => {
        return acc.concat(curCard.items);
      }, [] as IItems[]);

      const filteredItems = allItems.filter((item) => {
        return Object.values(item).some((item: string | number) => {
          return item.toString().toLowerCase().includes(searchedText.toLowerCase());
        });
      });

      dispatch(setShowedItems(filteredItems));
    }
  };
}
