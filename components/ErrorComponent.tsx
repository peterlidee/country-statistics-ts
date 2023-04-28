import Head from 'next/head'
import Header from './header/Header'

const errorBlockStyles = {
  maxWidth: '1500px',
  minHeight: '15em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

function ErrorComponent() {
  return (
    <>
      <Head>
        <title>404 Page not found</title>
      </Head>
      <Header />
      <div style={errorBlockStyles}>
        <div style={{ fontSize: '2em' }}>404</div>
        <div style={{ marginLeft: '1em' }}>Page not found</div>
      </div>
    </>
  )
}

export default ErrorComponent
