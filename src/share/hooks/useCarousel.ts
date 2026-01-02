import { useEffect, useState } from 'react'

export const useCarousel = (length: number, delay = 7000) => {
	const [activeIndex, setActiveIndex] = useState(0)

	useEffect(() => {
		if (length <= 1) return
		const id = window.setInterval(() => {
			setActiveIndex(prev => (prev + 1) % length)
		}, delay)

		return () => window.clearInterval(id)
	}, [length, delay])

	return { activeIndex, setActiveIndex }
}
