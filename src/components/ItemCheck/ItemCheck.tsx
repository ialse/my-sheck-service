import { FC } from 'react';
import styles from './ItemCheck.module.scss';
import { IItems } from '@/store/entities/cards/types';

interface ItemCheckProps {
  itemCheck: IItems;
}

const ItemCheck: FC<ItemCheckProps> = ({ itemCheck }) => {
  return (
    <div className={styles.root}>
      <p>{itemCheck.name}</p>
      <p>{itemCheck.quantity}</p>
      <p>{itemCheck.sum / 100}</p>
      <p>{itemCheck.date}</p>
    </div>
  );
};

export default ItemCheck;
