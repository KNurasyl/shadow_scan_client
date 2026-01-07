type Styles = Record<string, string>;

type Props = {
  styles: Styles;
  kicker: string;
  title: string;
  subtitle?: string;
};

export const SectionHeader = ({ styles, kicker, title, subtitle }: Props) => {
  return (
    <div className={styles.sectionHeader}>
      <div>
        <p className={styles.sectionKicker}>{kicker}</p>
        <h2 className={styles.sectionTitle}>{title}</h2>
      </div>
      {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
    </div>
  );
};
