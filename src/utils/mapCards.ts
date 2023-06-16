import { ICard } from '@/store/entities/cards/types';

export const mapCards = (innerCards: string): ICard[] => {
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
