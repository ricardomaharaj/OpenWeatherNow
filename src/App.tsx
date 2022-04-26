import { useEffect, useState } from 'react'
import { createClient, Provider } from 'urql'
import { Home } from './Home'

let url = 'http://localhost:4000/gql'
if (process.env.NODE_ENV === 'production') { url = '/gql' }
let client = createClient({ url })

export function App() {

    let [location, setLocation] = useState<GeolocationCoordinates>()

    useEffect(() => { navigator.geolocation.getCurrentPosition(x => setLocation(x.coords)) }, [])

    return <>
        <Provider value={client}>
            {location && <Home lat={location.latitude} lon={location.longitude} />}
        </Provider>
    </>
}
