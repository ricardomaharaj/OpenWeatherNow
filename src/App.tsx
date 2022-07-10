import { useEffect, useState } from 'react'
import { createClient, Provider as UrqlProvider } from 'urql'
import { Home } from './Home'

let url = process.env.NODE_ENV === 'production' ? 'https://r8r-gql.herokuapp.com/' : 'http://localhost:4000/'

let urqlClient = createClient({ url })

export function App() {

    let [location, setLocation] = useState<GeolocationCoordinates>()

    let askForLocation = () => { navigator.geolocation.getCurrentPosition(x => setLocation(x.coords)) }

    useEffect(() => {
        navigator.permissions.query({ name: 'geolocation' }).then((x) => { if (x.state === 'granted') { askForLocation() } })
    }, [])

    return <>
        <UrqlProvider value={urqlClient}>
            {location
                ? <Home lat={location.latitude} lon={location.longitude} />
                : <>
                    <div className='container mx-auto space-y-2'>
                        <div className='bg-red-800 rounded-xl p-2 text-white'> location is required for this application </div>
                        <div className='row justify-center'>
                            <button onClick={askForLocation} className='bg-green-800 text-white rounded-xl p-2'> ALLOW LOCATION </button>
                        </div>
                    </div>
                </>}
        </UrqlProvider>
    </>
}
