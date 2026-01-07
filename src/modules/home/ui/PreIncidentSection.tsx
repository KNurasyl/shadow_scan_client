import { RevealSection } from '../../../share/hoc';
import { preIncidentSteps } from '../model/content';
import { SectionHeader } from './SectionHeader';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
};

export const PreIncidentSection = ({ styles }: Props) => {
  return (
    <RevealSection className={styles.section} id="preIncident" styles={styles}>
      <div className={styles.container}>
        <SectionHeader
          styles={styles}
          kicker="ПОДХОД"
          title="Анализ цифрового следа до того, как случится инцидент"
          subtitle="Платформа работает не только реактивно, но и превентивно: строит модель экспозиции и показывает, где нужно закрыть риски заранее."
        />

        <div className={styles.preIncidentGrid}>
          {preIncidentSteps.map((s) => (
            <div key={s.badge} className={styles.preIncidentStep}>
              <div className={styles.stepBadge}>{s.badge}</div>
              <h3 className={styles.preIncidentTitle}>{s.title}</h3>
              <p className={styles.preIncidentText}>{s.text}</p>
              <ul className={styles.preIncidentList}>
                {s.bullets.map((b) => (
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
