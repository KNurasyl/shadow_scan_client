import { RevealSection } from '../../../share/hoc';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
};

export const RibbonSection = ({ styles }: Props) => {
  return (
    <RevealSection className={styles.ribbonSection} styles={styles}>
      <div className={styles.container}>
        <div className={styles.ribbonInner}>
          <span className={styles.ribbonLabel}>Кому это нужно:</span>
          <div className={styles.ribbonItems}>
            <span className={styles.ribbonItem}>SOC и Blue Team</span>
            <span className={styles.ribbonItem}>OSINT-аналитики</span>
            <span className={styles.ribbonItem}>Отдел ИБ и risk-офицеры</span>
            <span className={styles.ribbonItem}>Red Team / пентестеры</span>
            <span className={styles.ribbonItem}>HR-проверки и due diligence</span>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};
