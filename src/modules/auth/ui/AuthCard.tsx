import type { ReactNode } from 'react';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  children: ReactNode;
};

export const AuthCard = ({ styles, children }: Props) => {
  return (
    <div className={styles.page}>
      <div className={styles.card}>{children}</div>
    </div>
  );
};
