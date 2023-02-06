export const daysArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

export const baseImageUrl = 'https://openweathermap.org/img/wn/'

export const iconThemeData: Record<string, string> = {
  // DAY
  '01d': 'bg-yellow-300   ', // clear sky
  '02d': 'bg-yellow-200   ', // few clouds
  '03d': 'bg-slate-300 ', // scattered clouds
  '04d': 'bg-slate-400 ', // broken clouds
  '09d': 'bg-sky-400      ', // shower rain
  '10d': 'bg-blue-400     ', // rain
  '11d': 'bg-purple-300   ', // thunderstorm
  '13d': 'bg-slate-200 ', // snow
  '50d': 'bg-slate-500 ', // mist
  // NIGHT
  '01n': 'bg-slate-300 ', // clear sky
  '02n': 'bg-slate-400 ', // few clouds
  '03n': 'bg-slate-400 ', // scattered clouds
  '04n': 'bg-slate-400 ', // broken clouds
  '09n': 'bg-sky-400      ', // shower rain
  '10n': 'bg-blue-400     ', // rain
  '11n': 'bg-purple-300   ', // thunderstorm
  '13n': 'bg-slate-200 ', // snow
  '50n': 'bg-slate-500 ' // mist
}
