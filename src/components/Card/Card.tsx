import { FC } from 'react';
import styles from './Card.module.scss';
import { ICard } from '@/store/entities/cards/types';
import ItemCheck from '../ItemCheck/ItemCheck';

interface CardProps {
  card: ICard;
}

const Card: FC<CardProps> = ({ card }) => {
  return (
    <div className={styles.root}>
      <div>
        <p>Общая информация</p>
        <p>Дата операции: {card.commonInfo.dateTime}</p>
        <p>Адрес: {card.commonInfo.retailPlaceAddress}</p>
        <p>Общая сумма: {card.commonInfo.totalSum / 100} рублей</p>
        <p>Инн магазина: {card.commonInfo.userInn}</p>
      </div>

      <div className={styles.items}>
        <div className={styles.item}>
          <p>Товар</p>
          <p>Количество</p>
          <p>Стоимость</p>
        </div>
        {card.items.map((item, index) => {
          return <ItemCheck key={index} itemCheck={item} />;
        })}
      </div>
    </div>
  );
};

export default Card;
