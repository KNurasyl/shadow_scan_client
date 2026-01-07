import { RevealSection } from '../../../share/hoc';
import { useCarousel } from '../../../share/hooks';
import { cn } from '../../../share/utils/cn';
import { carouselItems } from '../model/content';
import { SectionHeader } from './SectionHeader';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
};

export const ScenariosCarouselSection = ({ styles }: Props) => {
  const { activeIndex, setActiveIndex } = useCarousel(carouselItems.length);

  return (
    <RevealSection className={styles.carouselSection} id="scenarios" styles={styles}>
      <div className={styles.container}>
        <SectionHeader
          styles={styles}
          kicker="ЖИВЫЕ СЦЕНАРИИ"
          title="Как платформа используется в реальной работе"
          subtitle="Карусель сценариев показывает, как один и тот же цифровой след используется SOC, Red Team и HR."
        />

        <div className={styles.carouselShell}>
          <div className={styles.carouselBody}>
            {carouselItems.map((item, index) => (
              <article
                key={item.id}
                className={cn(
                  styles.carouselItem,
                  index === activeIndex && styles.carouselItemActive
                )}
              >
                <p className={styles.carouselTag}>{item.tag}</p>
                <h3 className={styles.carouselTitle}>{item.title}</h3>
                <p className={styles.carouselText}>{item.description}</p>
                <ul className={styles.carouselList}>
                  {item.metrics.map((m) => (
                    <li key={m}>{m}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className={styles.carouselFooter}>
            <div className={styles.carouselDots}>
              {carouselItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    styles.carouselDot,
                    index === activeIndex && styles.carouselDotActive
                  )}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Показать сценарий: ${item.tag}`}
                />
              ))}
            </div>

            <span className={styles.carouselHint}>
              Сценарии можно использовать как основу для раздела «Практическая часть» в дипломе.
            </span>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};
