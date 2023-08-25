// pages/_document.js
// https://nextjs.org/docs/messages/no-page-custom-font
// TODO: remove old import
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='en'>
      <Head>
        {/* TODO
          todso
         <link
          href='https://fonts.googleapis.com/css2?family=Inconsolata&family=Quicksand:wght@400;500;700&display=swap'
          rel='stylesheet'
        /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
