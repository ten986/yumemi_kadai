import React from 'react'
import { AppProps } from 'next/app'
import Head from 'next/head'

import '../styles/global.css'

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default App
