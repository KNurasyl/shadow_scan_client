import { RevealSection } from '../../../share/hoc';
import { archBlocks } from '../model/content';
import { SectionHeader } from './SectionHeader';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
};

export const ArchitectureSection = ({ styles }: Props) => {
  return (
    <RevealSection className={styles.section} id="architecture" styles={styles}>
      <div className={styles.container}>
        <SectionHeader
          styles={styles}
          kicker="АРХИТЕКТУРА ПРОЕКТА"
          title="Что внутри системы"
          subtitle="Структура, которую удобно показывать на защите диплома: слои данных, сервисы, API и интерфейс."
        />

        <div className={styles.archGrid}>
          {archBlocks.map((b) => (
            <div key={b.title} className={styles.archBlock}>
              <h3 className={styles.archTitle}>{b.title}</h3>
              <p className={styles.archText}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </RevealSection>
  );
};
