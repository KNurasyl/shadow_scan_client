import type { ReactNode } from 'react'
import { useRevealOnScroll } from '../hooks'

type RevealSectionProps = {
	className?: string
	children: ReactNode
	id?: string
	styles: CSSModuleClasses
}

export const RevealSection = ({
	children,
	className,
	id,
	styles,
}: RevealSectionProps) => {
	const { ref, visible } = useRevealOnScroll()

	return (
		<section
			ref={ref}
			id={id}
			className={[
				styles.revealSection,
				visible ? styles.revealSectionVisible : '',
				className ?? '',
			]
				.filter(Boolean)
				.join(' ')}
		>
			{children}
		</section>
	)
}
