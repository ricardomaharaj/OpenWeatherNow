import { useState } from 'react'

export function useLocation() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null)
  const [error, setError] = useState('')

  const askForLocation = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation(coords)
        },
        (err) => {
          setError('Error: ' + err.message)
        }
      )
    } else {
      setError('sorry your device does not support geolocation')
    }
  }

  return { location, askForLocation, error }
}
