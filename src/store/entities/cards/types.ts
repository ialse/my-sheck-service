export interface ICommonInfo {
  createdAt: string;
  dateTime: string;
  retailPlaceAddress: string;
  totalSum: number;
  userInn: number;
}

export interface IItems {
  name: string;
  nds: number;
  paymentType: number;
  price: number;
  productType: number;
  quantity: number;
  sum: number;
  date: 'string';
}

export interface ICard {
  id: string;
  commonInfo: ICommonInfo;
  items: IItems[];
}

export enum ModeCards {
  Checks = 'checks',
  Items = 'items',
}

export interface CardsReducer {
  allCards: ICard[];
  showedCards: ICard[];
  showedItems: IItems[];
  mode: ModeCards;
  searchedText: string;
}

export interface CardsAction {
  type: string;
  payload?: ICard[] | IItems[];
}
