import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { SWRConfig } from 'swr'
import axios from 'axios'

// Source: https://swr.vercel.app/docs/global-configuration
const fetcher = (url: string) => axios.get(url).then(res => res.data)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        fetcher: fetcher,
        onError: (error, key) => {
          if (error) {
            console.log('error on global');
            
            // We can send the error to Sentry,
            // or show a notification UI.
          }
        }
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  )
}

export default MyApp
