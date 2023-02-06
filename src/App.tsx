import { useEffect } from 'react'
import { createClient as createUrql, Provider as UrqlProvider } from 'urql'
import { Weather } from './comps/weather'
import { useLocation } from './hooks/location'

const url =
  process.env.NODE_ENV === 'production'
    ? 'https://r8r-gql.herokuapp.com/'
    : 'http://localhost:4000/'

const urqlClient = createUrql({ url })

export function App() {
  const { location, askForLocation, error } = useLocation()

  useEffect(() => {
    askForLocation()
  }, [])

  return (
    <>
      <UrqlProvider value={urqlClient}>
        {error && <div className='err'>{error}</div>}
        {location && (
          <Weather lat={location.latitude} lon={location.longitude} />
        )}
      </UrqlProvider>
    </>
  )
}
