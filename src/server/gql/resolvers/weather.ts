import { env } from '~/server/env'
import { WeatherData } from '~/types/gql'
import { Resolver } from '~/types/resolver'

const apiUrl = 'https://api.openweathermap.org/data/3.0/onecall'

type Args = {
  lat: number
  lon: number
}

export const weatherResolver: Resolver<WeatherData, Args> = async (_, args) => {
  const params = new URLSearchParams({
    appid: env.OPEN_WEATHER_API_KEY,
    lat: `${args.lat}`,
    lon: `${args.lon}`,
    units: 'metric',
  })

  const req = await fetch(`${apiUrl}?${params}`, { cache: 'force-cache' })
  const json = await req.json()
  return json
}
