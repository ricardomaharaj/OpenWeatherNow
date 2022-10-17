import { useState } from 'react'
import { createClient, Provider as UrqlProvider } from 'urql'
import { Weather } from './Weather'

let url =
    process.env.NODE_ENV === 'production'
        ? 'https://r8r-gql.herokuapp.com/'
        : 'http://localhost:4000/'

let urqlClient = createClient({ url })

export function App() {
    let [location, setLocation] = useState<GeolocationCoordinates>()

    navigator.geolocation.getCurrentPosition(({ coords }) =>
        setLocation(coords)
    )

    return (
        <>
            <UrqlProvider value={urqlClient}>
                <div className='container mx-auto space-y-2'>
                    {location && (
                        <Weather
                            lat={location.latitude}
                            lon={location.longitude}
                        />
                    )}
                </div>
            </UrqlProvider>
        </>
    )
}
