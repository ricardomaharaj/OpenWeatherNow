export const typeDefs = /* GraphQL */ `
  type Query {
    weather(lat: Float, lon: Float): WeatherData
  }

  type WeatherData {
    lat: Float
    lon: Float
    timezone: String
    timezone_offset: Float
    current: Current
    minutely: [Minutely]
    hourly: [Hourly]
    daily: [Daily]
    alerts: [Alert]
  }

  type Alert {
    sender_name: String
    event: String
    start: Float
    end: Float
    description: String
    tags: [String]
  }

  type Current {
    dt: Float
    sunrise: Float
    sunset: Float
    temp: Float
    feels_like: Float
    pressure: Float
    humidity: Float
    dew_point: Float
    uvi: Float
    clouds: Float
    visibility: Float
    wind_speed: Float
    wind_deg: Float
    wind_gust: Float
    weather: [CurrentWeather]
  }

  type CurrentWeather {
    id: Float
    main: String
    description: String
    icon: String
  }

  type Daily {
    dt: Float
    sunrise: Float
    sunset: Float
    moonrise: Float
    moonset: Float
    moon_phase: Float
    summary: String
    temp: Temp
    feels_like: FeelsLike
    pressure: Float
    humidity: Float
    dew_point: Float
    wind_speed: Float
    wind_deg: Float
    wind_gust: Float
    weather: [CurrentWeather]
    clouds: Float
    pop: Float
    rain: Float
    uvi: Float
  }

  type FeelsLike {
    day: Float
    night: Float
    eve: Float
    morn: Float
  }

  type Temp {
    day: Float
    min: Float
    max: Float
    night: Float
    eve: Float
    morn: Float
  }

  type Hourly {
    dt: Float
    temp: Float
    feels_like: Float
    pressure: Float
    humidity: Float
    dew_point: Float
    uvi: Float
    clouds: Float
    visibility: Float
    wind_speed: Float
    wind_deg: Float
    wind_gust: Float
    weather: [CurrentWeather]
    pop: Float
  }

  type Minutely {
    dt: Float
    precipitation: Float
  }
`
