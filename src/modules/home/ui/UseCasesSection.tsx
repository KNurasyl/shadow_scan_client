import { RevealSection } from '../../../share/hoc';
import { useCases } from '../model/content';
import { SectionHeader } from './SectionHeader';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
};

export const UseCasesSection = ({ styles }: Props) => {
  return (
    <RevealSection className={styles.section} styles={styles}>
      <div className={styles.container}>
        <SectionHeader styles={styles} kicker="РОЛИ" title="Где система полезнее всего" />

        <div className={styles.useCasesGrid}>
          {useCases.map((u) => (
            <div key={u.title} className={styles.useCaseCard}>
              <h3 className={styles.useCaseTitle}>{u.title}</h3>
              <p className={styles.useCaseText}>{u.text}</p>
              <ul className={styles.useCaseList}>
                {u.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
};
