import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

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
