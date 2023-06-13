import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CardsReducer, ICard, IItems, ModeCards } from './types';

const initialState: CardsReducer = {
  allCards: [],
  showedCards: [],
  showedItems: [],
  searchedText: '',
  mode: ModeCards.Checks,
};

const cardsSlice = createSlice({
  name: 'Cards',
  initialState,
  reducers: {
    setAllCards(state, action: PayloadAction<ICard[]>) {
      state.allCards = action.payload;
      state.showedCards = action.payload;
    },
    setShowedCards(state, action: PayloadAction<ICard[]>) {
      state.showedCards = action.payload;
    },
    setShowedItems(state, action: PayloadAction<IItems[]>) {
      state.showedItems = action.payload;
    },
    setInitialCards(state) {
      state.showedCards = state.allCards;
    },
    setInitialItems(state) {
      const initialItems = state.allCards.reduce((acc, curCard) => {
        return acc.concat(curCard.items);
      }, [] as IItems[]);

      state.showedItems = initialItems;
    },
    setModeCards(state, action: PayloadAction<ModeCards>) {
      state.mode = action.payload;
    },
    setSearchedText(state, action: PayloadAction<string>) {
      state.searchedText = action.payload;
    },
    resetSearchedText(state) {
      state.searchedText = '';
    },
  },
});

export const {
  setAllCards,
  setShowedCards,
  setShowedItems,
  setInitialCards,
  setInitialItems,
  setModeCards,
  setSearchedText,
  resetSearchedText,
} = cardsSlice.actions;
export default cardsSlice.reducer;
