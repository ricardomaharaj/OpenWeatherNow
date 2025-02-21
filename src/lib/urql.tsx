import { ReactNode } from 'react'
import { cacheExchange, createClient, fetchExchange, Provider } from 'urql'

const client = createClient({
  url: '/api/gql',
  exchanges: [cacheExchange, fetchExchange],
})

export const Urql = ({ children }: { children: ReactNode }) => (
  <Provider value={client}>{children}</Provider>
)
