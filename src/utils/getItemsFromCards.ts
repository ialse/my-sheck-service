import { ICard, IItems } from '@/store/entities/cards/types';

export const getItemsFromCards = (cards: ICard[]) => {
  if (cards) {
    return cards.reduce((acc, curCard) => {
      return acc.concat(curCard.items);
    }, [] as IItems[]);
  } else {
    return [];
  }
};
