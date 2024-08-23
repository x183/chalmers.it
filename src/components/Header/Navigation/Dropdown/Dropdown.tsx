import { Inter } from 'next/font/google';
import styles from './Dropdown.module.scss';
import { HTMLAttributes, ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'], weight: '600' });

type Props = {
  parent: ReactNode;
  id: string;
  children: ReactNode;
  contentClassName?: string;
};

const Dropdown = ({
  children,
  parent,
  id,
  className,
  contentClassName,
  ...rest
}: Props & HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`${styles.dropdown} ${className}`} {...rest}>
      <input
        type="radio"
        id={id}
        name="dropdown"
        className={styles.dropdownInput}
        hidden
      />
      <label htmlFor={id} className={styles.dropdownLabel}>
        {parent}
      </label>
      <div className={`${styles.dropdownHitbox}`} />

      <div className={`${styles.dropdownContainer} ${contentClassName}`}>
        <div className={`${styles.dropdownContent} ${inter.className}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
