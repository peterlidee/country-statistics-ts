import 'normalize.css'
import '../styles/index.scss'
import Page from '@/components/Page'
import type { AppProps } from 'next/app'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Page>
        <Component {...pageProps} />
      </Page>
    </QueryClientProvider>
  )
}
