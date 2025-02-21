import { useEffect, useState } from 'react'
import { Weather } from '~/comps/weather'

export function Home() {
  const [location, setLocation] = useState<{ lat?: number; lon?: number }>({})

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((val) => {
      const { latitude, longitude } = val.coords
      setLocation({
        lat: latitude,
        lon: longitude,
      })
    })
  }, [])

  if (location.lat && location.lon) {
    return <Weather lat={location.lat} lon={location.lon} />
  }

  return <></>
}
