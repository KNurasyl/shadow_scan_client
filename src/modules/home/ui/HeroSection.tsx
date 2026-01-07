type Styles = Record<string, string>;

type Props = {
  styles: Styles;
};

export const HeroSection = ({ styles }: Props) => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <div className={styles.heroContent}>
            <p className={styles.heroTag}>OSINT · DIGITAL FOOTPRINT · CYBER SECURITY</p>

            <h1 className={styles.heroTitle}>
              Анализ цифрового следа
              <span className={styles.heroTitleAccent}>до того, как случится инцидент</span>
            </h1>

            <p className={styles.heroSubtitle}>
              Интеллектуальная система OSINT-аналитики, которая собирает открытые данные о
              пользователе, строит карту цифрового следа и подсвечивает риски: утечки, фишинг,
              социальная инженерия, компрометация аккаунтов.
            </p>

            <div className={styles.heroActions}>
              <button className={styles.primaryButton}>Запустить пробный анализ</button>
              <button className={styles.secondaryButton}>Посмотреть демо-отчёт</button>
            </div>

            <div className={styles.heroBadges}>
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} />
                Подходит для SOC, Blue Team, OSINT-аналитиков
              </div>
              <div className={styles.heroBadge}>
                Использует OSINT, корреляцию артефактов и риск-скоринг
              </div>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.statItem}>
                <div className={styles.statValue}>50М+</div>
                <div className={styles.statLabel}>обработанных артефактов</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>10×</div>
                <div className={styles.statLabel}>ускорение OSINT-расследований</div>
              </div>
              <div className={styles.statItem}>
                <div className={styles.statValue}>24/7</div>
                <div className={styles.statLabel}>мониторинг цифрового следа</div>
              </div>
            </div>

            <div className={styles.heroHint}>
              <span className={styles.heroHintDot} />
              Покажите этот экран как лендинг дипломного проекта: понятная ценность, сценарий
              использования и архитектура.
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroRadarCard}>
              <div className={styles.heroRadarHeader}>
                <span className={styles.heroRadarTitle}>Digital Footprint Graph</span>
                <span className={styles.heroRadarBadge}>Live scan</span>
              </div>

              <div className={styles.heroRadarBody}>
                <div className={styles.heroRadar}>
                  <div className={styles.heroRadarCircle} />
                  <div className={styles.heroRadarCircle} />
                  <div className={styles.heroRadarCircle} />
                  <div className={styles.heroRadarBeam} />
                  <div className={`${styles.heroRadarNode} ${styles.node1}`} />
                  <div className={`${styles.heroRadarNode} ${styles.node2}`} />
                  <div className={`${styles.heroRadarNode} ${styles.node3}`} />
                  <div className={`${styles.heroRadarNode} ${styles.node4}`} />
                </div>

                <div className={styles.heroRadarMetrics}>
                  <div className={styles.heroRadarMetricRow}>
                    <span className={styles.heroRadarMetricLabel}>Связанные аккаунты</span>
                    <span className={styles.heroRadarMetricValue}>12</span>
                  </div>
                  <div className={styles.heroRadarMetricRow}>
                    <span className={styles.heroRadarMetricLabel}>Обнаружено утечек</span>
                    <span
                      className={`${styles.heroRadarMetricValue} ${styles.heroRadarMetricValueCritical}`}
                    >
                      3 критичных
                    </span>
                  </div>
                  <div className={styles.heroRadarMetricRow}>
                    <span className={styles.heroRadarMetricLabel}>Уровень экспозиции</span>
                    <span className={styles.heroChipRisk}>Высокий</span>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.heroSideCard}>
              <div className={styles.heroSideLabel}>Рекомендация системы</div>
              <p className={styles.heroSideText}>
                Совпадение пароля в четырёх сервисах, старый email в открытой утечке и активная
                соцсеть с данными о работе.
              </p>
              <ul className={styles.heroSideList}>
                <li>смена паролей и включение MFA;</li>
                <li>очистка публичных метаданных профиля;</li>
                <li>обновление политики безопасности аккаунтов.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
