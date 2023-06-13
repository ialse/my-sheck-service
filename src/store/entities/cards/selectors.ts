import { RootReducer } from '../../rootReducer';
import { ICard, IItems, ModeCards } from './types';

export const selectAllCards = (state: RootReducer): ICard[] => state.cards.allCards;
export const selectShowedCards = (state: RootReducer): ICard[] => state.cards.showedCards;

export const selectAllItems = (state: RootReducer): IItems[] => {
  if (state.cards.allCards) {
    return state.cards.allCards?.reduce((acc, curCard) => {
      return acc.concat(curCard.items);
    }, [] as IItems[]);
  } else {
    return [];
  }
};

export const selectShowedItems = (state: RootReducer): IItems[] => state.cards.showedItems;

export const selectMode = (state: RootReducer): ModeCards => state.cards.mode;
export const selectSearchedText = (state: RootReducer): string => state.cards.searchedText;
