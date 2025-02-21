import { gql } from 'urql'
import { WeatherData } from '~/types/gql'

type Vars = {
  lat: number
  lon: number
}

type Data = {
  weather: WeatherData
}

export const weatherQuery = gql<Data, Vars>`
  query ($lat: Float, $lon: Float) {
    weather(lat: $lat, lon: $lon) {
      current {
        feels_like
        weather {
          icon
        }
      }
      hourly {
        dt
        feels_like
        weather {
          icon
        }
      }
      daily {
        dt
        feels_like {
          day
        }
        weather {
          icon
        }
      }
    }
  }
`
