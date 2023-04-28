import 'normalize.css'
import '../styles/index.scss'
import Page from '@/components/Page'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  )
}
