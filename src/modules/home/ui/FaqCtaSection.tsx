import { RevealSection } from '../../../share/hoc';

type Styles = Record<string, string>;

type Props = {
  styles: Styles;
};

export const FaqCtaSection = ({ styles }: Props) => {
  return (
    <RevealSection className={styles.section} styles={styles}>
      <div className={styles.container}>
        <div className={styles.faqLayout}>
          <div className={styles.faqColumn}>
            <p className={styles.sectionKicker}>FAQ</p>
            <h2 className={styles.sectionTitle}>Ответы на вопросы для заказчика и комиссии</h2>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>На чём построена система технически?</h3>
              <p className={styles.faqAnswer}>
                Фронтенд — React/Next.js, бэкенд — NestJS, отдельный слой OSINT-сборщиков, база
                данных (PostgreSQL или MongoDB), очереди для фоновых задач и REST/GraphQL-API.
              </p>
            </div>

            <div className={styles.faqItem}>
              <h3 className={styles.faqQuestion}>
                Можно ли использовать проект после защиты диплома?
              </h3>
              <p className={styles.faqAnswer}>
                Да, архитектура изначально спроектирована как продуктовая: есть роли, сценарии
                использования, модули интеграции и отчётность для реальных заказчиков.
              </p>
            </div>
          </div>

          <div className={styles.ctaCard}>
            <h2 className={styles.ctaTitle}>Проверьте один аккаунт и получите полный отчёт</h2>
            <p className={styles.ctaSubtitle}>
              Выберите тестовый профиль, запустите OSINT-анализ и покажите на защите путь: от одного
              артефакта до карты цифрового следа и рекомендаций.
            </p>
            <div className={styles.ctaActions}>
              <button className={styles.primaryButton}>Запустить тестовый анализ</button>
              <button className={styles.secondaryButtonLight}>Скачать пример отчёта</button>
            </div>
          </div>
        </div>
      </div>
    </RevealSection>
  );
};
