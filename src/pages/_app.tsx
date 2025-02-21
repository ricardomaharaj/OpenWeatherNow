import type { AppProps } from 'next/app'
import { Urql } from '~/lib/urql'
import '~/style/tw.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Urql>
      <Component {...pageProps} />
    </Urql>
  )
}
