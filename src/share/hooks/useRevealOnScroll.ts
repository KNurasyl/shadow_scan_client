import { useEffect, useRef, useState } from 'react'

export const useRevealOnScroll = () => {
	const ref = useRef<HTMLElement | null>(null)
	const [visible, setVisible] = useState(false)

	useEffect(() => {
		const element = ref.current
		if (!element) return

		const observer = new IntersectionObserver(
			entries => {
				entries.forEach(entry => {
					if (entry.isIntersecting) {
						setVisible(true)
						observer.unobserve(entry.target)
					}
				})
			},
			{ threshold: 0.2 }
		)

		observer.observe(element)

		return () => observer.disconnect()
	}, [])

	return { ref, visible }
}
