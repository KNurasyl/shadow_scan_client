import { RevealSection } from '../../share/hoc'
import { useCarousel } from '../../share/hooks'
import styles from './Home.module.css'

type CarouselItem = {
	id: string
	tag: string
	title: string
	description: string
	metrics: string[]
}

const carouselItems: CarouselItem[] = [
	{
		id: 'soc',
		tag: 'SOC / Blue Team',
		title: 'Таргетированная фишинговая атака на руководителя отдела',
		description:
			'Система за 30 секунд показывает все публичные аккаунты и адреса, связанные с рабочей почтой руководителя, находит старые утечки паролей и подсвечивает уязвимые узлы.',
		metrics: [
			'12 связанных аккаунтов',
			'2 критичные утечки',
			'рекомендации по MFA и ротации паролей',
		],
	},
	{
		id: 'red',
		tag: 'Red Team / пентест',
		title: 'Подготовка реалистичного сценария социальной инженерии',
		description:
			'На основе цифрового следа строится карта привычек, интересов и рабочих связей сотрудника, что позволяет смоделировать правдоподобную легенду для теста устойчивости.',
		metrics: [
			'глубокий контекст по профилю',
			'выделены слабые точки экспозиции',
			'готовый отчёт для руководства',
		],
	},
	{
		id: 'hr',
		tag: 'HR / due diligence',
		title: 'Проверка кандидата на критичную позицию',
		description:
			'Платформа аккуратно собирает публично доступную информацию: участие в проектах, след в соцсетях, возможные конфликты интересов и репутационные риски.',
		metrics: [
			'soft-risk профиль кандидата',
			'выявлены потенциальные конфликты интересов',
			'отчёт в формате для HR и Legal',
		],
	},
]

export const Home = () => {
	const { activeIndex, setActiveIndex } = useCarousel(carouselItems.length)

	return (
		<div className={styles.home}>
			{/* HERO */}
			<section className={styles.hero}>
				<div className={styles.container}>
					<div className={styles.heroInner}>
						<div className={styles.heroContent}>
							<p className={styles.heroTag}>
								OSINT · DIGITAL FOOTPRINT · CYBER SECURITY
							</p>

							<h1 className={styles.heroTitle}>
								Анализ цифрового следа
								<span className={styles.heroTitleAccent}>
									до того, как случится инцидент
								</span>
							</h1>

							<p className={styles.heroSubtitle}>
								Интеллектуальная система OSINT-аналитики, которая собирает
								открытые данные о пользователе, строит карту цифрового следа и
								подсвечивает риски: утечки, фишинг, социальная инженерия,
								компрометация аккаунтов.
							</p>

							<div className={styles.heroActions}>
								<button className={styles.primaryButton}>
									Запустить пробный анализ
								</button>
								<button className={styles.secondaryButton}>
									Посмотреть демо-отчёт
								</button>
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
									<div className={styles.statLabel}>
										обработанных артефактов
									</div>
								</div>
								<div className={styles.statItem}>
									<div className={styles.statValue}>10×</div>
									<div className={styles.statLabel}>
										ускорение OSINT-расследований
									</div>
								</div>
								<div className={styles.statItem}>
									<div className={styles.statValue}>24/7</div>
									<div className={styles.statLabel}>
										мониторинг цифрового следа
									</div>
								</div>
							</div>

							<div className={styles.heroHint}>
								<span className={styles.heroHintDot} />
								Покажите этот экран как лендинг дипломного проекта: понятная
								ценность, сценарий использования и архитектура.
							</div>
						</div>

						<div className={styles.heroVisual}>
							<div className={styles.heroRadarCard}>
								<div className={styles.heroRadarHeader}>
									<span className={styles.heroRadarTitle}>
										Digital Footprint Graph
									</span>
									<span className={styles.heroRadarBadge}>Live scan</span>
								</div>

								<div className={styles.heroRadarBody}>
									<div className={styles.heroRadar}>
										<div className={styles.heroRadarCircle} />
										<div className={styles.heroRadarCircle} />
										<div className={styles.heroRadarCircle} />
										<div className={styles.heroRadarBeam} />
										<div
											className={`${styles.heroRadarNode} ${styles.node1}`}
										/>
										<div
											className={`${styles.heroRadarNode} ${styles.node2}`}
										/>
										<div
											className={`${styles.heroRadarNode} ${styles.node3}`}
										/>
										<div
											className={`${styles.heroRadarNode} ${styles.node4}`}
										/>
									</div>

									<div className={styles.heroRadarMetrics}>
										<div className={styles.heroRadarMetricRow}>
											<span className={styles.heroRadarMetricLabel}>
												Связанные аккаунты
											</span>
											<span className={styles.heroRadarMetricValue}>12</span>
										</div>
										<div className={styles.heroRadarMetricRow}>
											<span className={styles.heroRadarMetricLabel}>
												Обнаружено утечек
											</span>
											<span
												className={`
													${styles.heroRadarMetricValue} ${styles.heroRadarMetricValueCritical}
												`}
											>
												3 критичных
											</span>
										</div>
										<div className={styles.heroRadarMetricRow}>
											<span className={styles.heroRadarMetricLabel}>
												Уровень экспозиции
											</span>
											<span className={styles.heroChipRisk}>Высокий</span>
										</div>
									</div>
								</div>
							</div>

							<div className={styles.heroSideCard}>
								<div className={styles.heroSideLabel}>Рекомендация системы</div>
								<p className={styles.heroSideText}>
									Совпадение пароля в четырёх сервисах, старый email в открытой
									утечке и активная соцсеть с данными о работе.
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

			{/* Лента “для кого” */}
			<RevealSection className={styles.ribbonSection} styles={styles}>
				<div className={styles.container}>
					<div className={styles.ribbonInner}>
						<span className={styles.ribbonLabel}>Кому это нужно:</span>
						<div className={styles.ribbonItems}>
							<span className={styles.ribbonItem}>SOC и Blue Team</span>
							<span className={styles.ribbonItem}>OSINT-аналитики</span>
							<span className={styles.ribbonItem}>Отдел ИБ и risk-офицеры</span>
							<span className={styles.ribbonItem}>Red Team / пентестеры</span>
							<span className={styles.ribbonItem}>
								HR-проверки и due diligence
							</span>
						</div>
					</div>
				</div>
			</RevealSection>

			{/* Анализ до инцидента */}
			<RevealSection
				className={styles.section}
				id='preIncident'
				styles={styles}
			>
				<div className={styles.container}>
					<div className={styles.sectionHeader}>
						<div>
							<p className={styles.sectionKicker}>ПОДХОД</p>
							<h2 className={styles.sectionTitle}>
								Анализ цифрового следа до того, как случится инцидент
							</h2>
						</div>
						<p className={styles.sectionSubtitle}>
							Платформа работает не только реактивно, но и превентивно: строит
							модель экспозиции и показывает, где нужно закрыть риски заранее.
						</p>
					</div>

					<div className={styles.preIncidentGrid}>
						<div className={styles.preIncidentStep}>
							<div className={styles.stepBadge}>01</div>
							<h3 className={styles.preIncidentTitle}>Сканирование следа</h3>
							<p className={styles.preIncidentText}>
								Из одного входного артефакта (email, ник, домен, телефон)
								собираются связанные профили, домены, утечки, посты и
								упоминания.
							</p>
							<ul className={styles.preIncidentList}>
								<li>десятки источников OSINT;</li>
								<li>поиск старых и новых утечек;</li>
								<li>выделение «ядерных» артефактов.</li>
							</ul>
						</div>

						<div className={styles.preIncidentStep}>
							<div className={styles.stepBadge}>02</div>
							<h3 className={styles.preIncidentTitle}>Корреляция и граф</h3>
							<p className={styles.preIncidentText}>
								Все артефакты складываются в граф цифрового следа, где видны
								связи между аккаунтами, проектами, устройствами и ролями.
							</p>
							<ul className={styles.preIncidentList}>
								<li>профиль экспозиции сотрудника;</li>
								<li>узлы с наибольшим риском;</li>
								<li>история изменений во времени.</li>
							</ul>
						</div>

						<div className={styles.preIncidentStep}>
							<div className={styles.stepBadge}>03</div>
							<h3 className={styles.preIncidentTitle}>
								Риск-скоринг и действия
							</h3>
							<p className={styles.preIncidentText}>
								Система присваивает уровни риска и формирует список конкретных
								действий, которые нужно сделать до инцидента.
							</p>
							<ul className={styles.preIncidentList}>
								<li>приоритизация сотрудников и активов;</li>
								<li>чек-листы для пользователя и SOC;</li>
								<li>отчёты для руководства и комплаенса.</li>
							</ul>
						</div>
					</div>
				</div>
			</RevealSection>

			{/* Ключевые возможности */}
			<RevealSection className={styles.section} id='features' styles={styles}>
				<div className={styles.container}>
					<div className={styles.sectionHeader}>
						<div>
							<p className={styles.sectionKicker}>ВОЗМОЖНОСТИ</p>
							<h2 className={styles.sectionTitle}>
								Интеллектуальный OSINT по цифровому следу
							</h2>
						</div>
						<p className={styles.sectionSubtitle}>
							Вместо ручного поиска по десяткам сервисов система сама собирает
							артефакты, строит связи и показывает, где конкретно человек
							«подставлен» в интернете.
						</p>
					</div>

					<div className={styles.cardsGrid}>
						<div className={styles.card}>
							<div className={styles.cardIcon}>01</div>
							<h3 className={styles.cardTitle}>Автоматический OSINT-сбор</h3>
							<p className={styles.cardText}>
								Email, никнейм, домен, IP, телефон — стартуем с одного артефакта
								и автоматически обходим открытые источники: соцсети, доменные
								записи, базы утечек, paste-сервисы и др.
							</p>
						</div>

						<div className={styles.card}>
							<div className={styles.cardIcon}>02</div>
							<h3 className={styles.cardTitle}>Граф цифрового следа</h3>
							<p className={styles.cardText}>
								Построение графа связей: аккаунты, домены, посты, рабочие места,
								упоминания. Видно, какие узлы критичны и через что проще всего
								атаковать человека или организацию.
							</p>
						</div>

						<div className={styles.card}>
							<div className={styles.cardIcon}>03</div>
							<h3 className={styles.cardTitle}>Скоринг рисков и алерты</h3>
							<p className={styles.cardText}>
								Автоматическая оценка рисков по категориям: утечки, фишинг,
								социальная инженерия, брендовый риск. Уведомления при появлении
								новых артефактов или утечек.
							</p>
						</div>

						<div className={styles.card}>
							<div className={styles.cardIcon}>04</div>
							<h3 className={styles.cardTitle}>История изменений</h3>
							<p className={styles.cardText}>
								Таймлайн событий: когда появился новый профиль, утечка, домен
								или пост. Удобно для расследований и подготовки отчётов.
							</p>
						</div>

						<div className={styles.card}>
							<div className={styles.cardIcon}>05</div>
							<h3 className={styles.cardTitle}>
								Отчёты для людей и для отчётности
							</h3>
							<p className={styles.cardText}>
								Сжатый отчёт для пользователя и расширенный технический отчёт
								для специалистов ИБ с артефактами, источниками и рекомендациями.
							</p>
						</div>

						<div className={styles.card}>
							<div className={styles.cardIcon}>06</div>
							<h3 className={styles.cardTitle}>Интеграция с инфраструктурой</h3>
							<p className={styles.cardText}>
								Интеграция с SIEM/SOAR, корпоративным IDM или внутренними
								порталами для автоматического запуска проверок и выгрузки
								отчётов.
							</p>
						</div>
					</div>
				</div>
			</RevealSection>

			{/* Карусель сценариев */}
			<RevealSection
				className={styles.carouselSection}
				id='scenarios'
				styles={styles}
			>
				<div className={styles.container}>
					<div className={styles.sectionHeader}>
						<div>
							<p className={styles.sectionKicker}>ЖИВЫЕ СЦЕНАРИИ</p>
							<h2 className={styles.sectionTitle}>
								Как платформа используется в реальной работе
							</h2>
						</div>
						<p className={styles.sectionSubtitle}>
							Карусель сценариев показывает, как один и тот же цифровой след
							используется SOC, Red Team и HR.
						</p>
					</div>

					<div className={styles.carouselShell}>
						<div className={styles.carouselBody}>
							{carouselItems.map((item, index) => (
								<article
									key={item.id}
									className={[
										styles.carouselItem,
										index === activeIndex ? styles.carouselItemActive : '',
									]
										.filter(Boolean)
										.join(' ')}
								>
									<p className={styles.carouselTag}>{item.tag}</p>
									<h3 className={styles.carouselTitle}>{item.title}</h3>
									<p className={styles.carouselText}>{item.description}</p>
									<ul className={styles.carouselList}>
										{item.metrics.map(metric => (
											<li key={metric}>{metric}</li>
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
										type='button'
										className={[
											styles.carouselDot,
											index === activeIndex ? styles.carouselDotActive : '',
										]
											.filter(Boolean)
											.join(' ')}
										onClick={() => setActiveIndex(index)}
										aria-label={`Показать сценарий: ${item.tag}`}
									/>
								))}
							</div>
							<span className={styles.carouselHint}>
								Сценарии можно использовать как основу для раздела «Практическая
								часть» в дипломе.
							</span>
						</div>
					</div>
				</div>
			</RevealSection>

			{/* Сценарии использования (карточки) */}
			<RevealSection className={styles.section} styles={styles}>
				<div className={styles.container}>
					<div className={styles.sectionHeader}>
						<div>
							<p className={styles.sectionKicker}>РОЛИ</p>
							<h2 className={styles.sectionTitle}>
								Где система полезнее всего
							</h2>
						</div>
					</div>

					<div className={styles.useCasesGrid}>
						<div className={styles.useCaseCard}>
							<h3 className={styles.useCaseTitle}>SOC / Blue Team</h3>
							<p className={styles.useCaseText}>
								Быстро понять, что интернет знает о сотруднике, на которого уже
								идёт атака: какие у него публичные аккаунты, какие почты
								использует, где ещё всплывает его пароль.
							</p>
							<ul className={styles.useCaseList}>
								<li>проверка целевых фишинговых кампаний;</li>
								<li>оценка уязвимости ключевых сотрудников;</li>
								<li>подготовка к tabletop-упражнениям.</li>
							</ul>
						</div>

						<div className={styles.useCaseCard}>
							<h3 className={styles.useCaseTitle}>Red Team / пентест</h3>
							<p className={styles.useCaseText}>
								Использовать цифровой след как основу для сценариев социальной
								инженерии и фишинга — с этичной целью показать реальный уровень
								риска для компании.
							</p>
							<ul className={styles.useCaseList}>
								<li>подбор реалистичных легенд и входных точек;</li>
								<li>оценка зрелости политики безопасности пользователей;</li>
								<li>подготовка рекомендаций для руководства.</li>
							</ul>
						</div>

						<div className={styles.useCaseCard}>
							<h3 className={styles.useCaseTitle}>
								HR-проверки и due diligence
							</h3>
							<p className={styles.useCaseText}>
								Аккуратная проверка цифрового следа при найме на критичные
								позиции: нет ли токсичных активностей, конфликтов интересов или
								компрометирующей информации.
							</p>
							<ul className={styles.useCaseList}>
								<li>проверка кандидатов на ключевые роли;</li>
								<li>оценка публичного имиджа топ-менеджмента;</li>
								<li>поддержка комплаенса и risk-менеджмента.</li>
							</ul>
						</div>
					</div>
				</div>
			</RevealSection>

			{/* Архитектура */}
			<RevealSection
				className={styles.section}
				id='architecture'
				styles={styles}
			>
				<div className={styles.container}>
					<div className={styles.sectionHeader}>
						<div>
							<p className={styles.sectionKicker}>АРХИТЕКТУРА ПРОЕКТА</p>
							<h2 className={styles.sectionTitle}>Что внутри системы</h2>
						</div>
						<p className={styles.sectionSubtitle}>
							Структура, которую удобно показывать на защите диплома: слои
							данных, сервисы, API и интерфейс.
						</p>
					</div>

					<div className={styles.archGrid}>
						<div className={styles.archBlock}>
							<h3 className={styles.archTitle}>1. Сбор данных (OSINT-слой)</h3>
							<p className={styles.archText}>
								Микросервис для сбора артефактов из открытых источников по
								заданным правилам: соцсети, домены, утечки, paste-сервисы и др.
								Поддержка очередей и планировщиков задач.
							</p>
						</div>

						<div className={styles.archBlock}>
							<h3 className={styles.archTitle}>
								2. Корреляция и графовая модель
							</h3>
							<p className={styles.archText}>
								Модуль, который связывает артефакты между собой, строит граф
								сущностей и создаёт единый профиль пользователя с историей
								изменений.
							</p>
						</div>

						<div className={styles.archBlock}>
							<h3 className={styles.archTitle}>
								3. Риск-скоринг и рекомендации
							</h3>
							<p className={styles.archText}>
								Логика оценки рисков по набору правил и метрик. Результат —
								уровни риска, приоритеты и список действий по снижению
								экспозиции.
							</p>
						</div>

						<div className={styles.archBlock}>
							<h3 className={styles.archTitle}>4. Веб-интерфейс и API</h3>
							<p className={styles.archText}>
								Веб-панель для аналитиков и пользователей плюс API/вебхуки для
								интеграции с SOC, SIEM, внутренними порталами и ботами.
							</p>
						</div>
					</div>
				</div>
			</RevealSection>

			{/* FAQ + финальный CTA */}
			<RevealSection className={styles.section} styles={styles}>
				<div className={styles.container}>
					<div className={styles.faqLayout}>
						<div className={styles.faqColumn}>
							<p className={styles.sectionKicker}>FAQ</p>
							<h2 className={styles.sectionTitle}>
								Ответы на вопросы для заказчика и комиссии
							</h2>

							<div className={styles.faqItem}>
								<h3 className={styles.faqQuestion}>
									На чём построена система технически?
								</h3>
								<p className={styles.faqAnswer}>
									Фронтенд — React/Next.js, бэкенд — NestJS, отдельный слой
									OSINT-сборщиков, база данных (PostgreSQL или MongoDB), очереди
									для фоновых задач и REST/GraphQL-API.
								</p>
							</div>

							<div className={styles.faqItem}>
								<h3 className={styles.faqQuestion}>
									Можно ли использовать проект после защиты диплома?
								</h3>
								<p className={styles.faqAnswer}>
									Да, архитектура изначально спроектирована как продуктовая:
									есть роли, сценарии использования, модули интеграции и
									отчётность для реальных заказчиков.
								</p>
							</div>
						</div>

						<div className={styles.ctaCard}>
							<h2 className={styles.ctaTitle}>
								Проверьте один аккаунт и получите полный отчёт
							</h2>
							<p className={styles.ctaSubtitle}>
								Выберите тестовый профиль, запустите OSINT-анализ и покажите на
								защите путь: от одного артефакта до карты цифрового следа и
								рекомендаций.
							</p>
							<div className={styles.ctaActions}>
								<button className={styles.primaryButton}>
									Запустить тестовый анализ
								</button>
								<button className={styles.secondaryButtonLight}>
									Скачать пример отчёта
								</button>
							</div>
						</div>
					</div>
				</div>
			</RevealSection>
		</div>
	)
}
