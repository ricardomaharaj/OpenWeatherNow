export type WeatherData = {
  lat: number
  lon: number
  timezone: string
  timezone_offset: number
  current: Current
  minutely: Minutely[]
  hourly: Hourly[]
  daily: Daily[]
  alerts: Alert[]
}

export type Alert = {
  sender_name: string
  event: string
  start: number
  end: number
  description: string
  tags: string[]
}

export type Current = {
  dt: number
  sunrise: number
  sunset: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: CurrentWeather[]
}

export type CurrentWeather = {
  id: number
  main: string
  description: string
  icon: string
}

export type Daily = {
  dt: number
  sunrise: number
  sunset: number
  moonrise: number
  moonset: number
  moon_phase: number
  summary: string
  temp: Temp
  feels_like: FeelsLike
  pressure: number
  humidity: number
  dew_point: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: CurrentWeather[]
  clouds: number
  pop: number
  rain: number
  uvi: number
}

export type FeelsLike = {
  day: number
  night: number
  eve: number
  morn: number
}

export type Temp = {
  day: number
  min: number
  max: number
  night: number
  eve: number
  morn: number
}

export type Hourly = {
  dt: number
  temp: number
  feels_like: number
  pressure: number
  humidity: number
  dew_point: number
  uvi: number
  clouds: number
  visibility: number
  wind_speed: number
  wind_deg: number
  wind_gust: number
  weather: CurrentWeather[]
  pop: number
}

export type Minutely = {
  dt: number
  precipitation: number
}
