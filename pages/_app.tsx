import 'normalize.css'
import '../styles/index.scss'
import Page from '@/components/Page'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

queryClient.setDefaultOptions({
  queries: {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 2,
  },
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
      <ReactQueryDevtools initialIsOpen={true} position='bottom-right' />
    </QueryClientProvider>
  )
}
