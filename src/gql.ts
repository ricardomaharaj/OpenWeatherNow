import { gql, useQuery } from 'urql'
import { Weather } from './types/weather'

export function useWeatherQuery(variables: { lat: number; lon: number }) {
  return useQuery<{ weather: Weather }>({
    query: gql`
      query ($lat: Float, $lon: Float) {
        weather(lat: $lat, lon: $lon)
      }
    `,
    variables
  })
}
