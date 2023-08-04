import Footer from '@/components/Footer'
import ScrollIndicator from '@/components/ScrollIndicator'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ScrollIndicator/>
      <Component {...pageProps} />
      <Footer/>

      <style jsx global> {`
          body {
            margin: 0;
            overflow-x: hidden;
          }

          h3 {
            margin: 0;
          }
        `}
      </style>
    </>
  )
}
