import { useEffect, useState } from 'react'
import { createClient, Provider as UrqlProvider } from 'urql'
import { Home } from './Home'

let url = 'http://localhost:4000/gql'
if (process.env.NODE_ENV === 'production') { url = '/gql' }
let urqlClient = createClient({ url })

export function App() {

    document.querySelector('html')?.setAttribute('class', 'bg-black')

    let [location, setLocation] = useState<GeolocationCoordinates>()

    useEffect(() => { navigator.geolocation.getCurrentPosition(x => setLocation(x.coords)) }, [])

    return <>
        <UrqlProvider value={urqlClient}>
            {location
                ? <Home lat={location.latitude} lon={location.longitude} />
                : <div className='bg-red-800 text-white'> sorry, you must allow location for this application </div>}
        </UrqlProvider>
    </>
}
