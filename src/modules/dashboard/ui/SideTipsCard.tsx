type Styles = Record<string, string>;

type Props = { styles: Styles };

export const SideTipsCard = ({ styles }: Props) => {
  return (
    <div className={styles.sideCard}>
      <div className={styles.sideTitle}>Рекомендации по вводу</div>
      <ul className={styles.sideList}>
        <li>
          Домен указывайте без протокола: <span className={styles.mono}>example.com</span>
        </li>
        <li>
          Для ФИО можно оставить авто-режим или выбрать
          <span className={styles.mono}>HUMAN_NAME</span>
        </li>
        <li>
          Если нужно “мягко” для демо-сервера — используйте
          <span className={styles.mono}>Fast</span>
        </li>
      </ul>
    </div>
  );
};
