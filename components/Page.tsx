import Head from 'next/head'
import Footer from './Footer'
import React from 'react'

type PageProps = {
  children: React.ReactNode
}

function Page({ children }: PageProps) {
  return (
    <>
      <Head>
        <meta
          name='viewport'
          content='initial-scale=1.0, width=device-width'
          key='viewport'
        />
        <link rel='icon' href='/favicon.png' />
      </Head>
      <div className='site__container'>{children}</div>
      <Footer />
    </>
  )
}

export default Page
