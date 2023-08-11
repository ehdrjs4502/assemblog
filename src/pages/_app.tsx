import Footer from '@/components/Footer'
import ScrollIndicator from '@/components/ScrollIndicator'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <ScrollIndicator />
            <div className="wrapper">
                <Component {...pageProps} />
            </div>
            <Footer />

            <style jsx global>
                {`
                    .wrapper {
                        height: auto;
                        min-height: 100%;
                    }
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
