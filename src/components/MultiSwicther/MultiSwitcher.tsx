import { useEffect } from 'react';
import styles from './MultiSwitcher.module.scss';

interface SwitcherItem<T> {
  code: T;
  name: string;
}
interface MultiSwitcherProps<T> {
  id: string;
  items: SwitcherItem<T>[];
  defaultValue: SwitcherItem<T>;
  onChange: (code: T) => void;
}

export default function MultiSwitcher<T extends string>({ id, items, defaultValue, onChange }: MultiSwitcherProps<T>) {
  const handleClick = (code: T) => {
    onChange(code);
  };

  return (
    <div className={styles.root}>
      {items.map((item) => {
        const checked = item.code === defaultValue.code;
        return (
          <div key={item.code} className={styles.button}>
            <input
              type="radio"
              name={id}
              id={item.code}
              className={styles.input}
              checked={checked}
              onChange={() => {
                handleClick(item.code);
              }}
            />
            <label htmlFor={item.code} className={styles.label}>
              {item.name}
            </label>
          </div>
        );
      })}
    </div>
  );
}
