import { RevealSection } from '../../../share/hoc';
import { featureCards } from '../model/content';
import { SectionHeader } from './SectionHeader';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
};

export const FeaturesSection = ({ styles }: Props) => {
  return (
    <RevealSection className={styles.section} id="features" styles={styles}>
      <div className={styles.container}>
        <SectionHeader
          styles={styles}
          kicker="ВОЗМОЖНОСТИ"
          title="Интеллектуальный OSINT по цифровому следу"
          subtitle="Вместо ручного поиска по десяткам сервисов система сама собирает артефакты, строит связи и показывает, где конкретно человек «подставлен» в интернете."
        />

        <div className={styles.cardsGrid}>
          {featureCards.map((c) => (
            <div key={c.icon} className={styles.card}>
              <div className={styles.cardIcon}>{c.icon}</div>
              <h3 className={styles.cardTitle}>{c.title}</h3>
              <p className={styles.cardText}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
};
