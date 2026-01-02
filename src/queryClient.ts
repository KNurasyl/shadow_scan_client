import { MutationCache, QueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { showErrorMessage } from './share/functions'

const mutationCache = new MutationCache({
	onError: error => {
		if (error instanceof AxiosError) {
			const message = error.response?.data?.message ?? error.message
			showErrorMessage(message)
		}
	},
})
export const queryClient = new QueryClient({
	mutationCache,
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
})
