import dayjs from 'dayjs'
import { useQuery } from 'urql'
import { weatherQuery } from '~/gql/query/weather'
import { colors } from '~/util/colors'

const imgUrl = (icon: string) =>
  `https://openweathermap.org/img/wn/${icon}@2x.png`

type Props = {
  lat: number
  lon: number
}

export function Weather(props: Props) {
  const { lat, lon } = props

  const [req] = useQuery({
    query: weatherQuery,
    variables: {
      lat: lat,
      lon: lon,
    },
  })

  const weather = req.data?.weather

  if (!weather || req.fetching) return <></>

  const current = weather.current
  const hourly = weather.hourly
  const daily = weather.daily

  return (
    <>
      <div className='flex flex-col gap-2'>
        {/* Current Card */}
        <div
          className={`${colors[current.weather[0].icon]} flex flex-row items-center justify-between rounded-xl p-2`}
        >
          <img src={imgUrl(current.weather[0].icon)} width={75} />
          <div className='pr-2'>{current.feels_like.toFixed(0)}</div>
        </div>

        {/* Hourly Row */}
        <div className='flex flex-row gap-2 overflow-x-scroll'>
          {hourly.map((x, i) => (
            <div
              key={i}
              className={`${colors[x.weather[0].icon]} flex flex-col items-center rounded-xl p-2`}
            >
              <img src={imgUrl(x.weather[0].icon)} width={75} />

              <div className='flex flex-row gap-1'>
                <div>{x.feels_like.toFixed(0)}</div>
                <div>{'|'}</div>
                <div>{dayjs(x.dt * 1000).format('hh')}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Daily Col */}
        <div className='flex flex-col gap-2'>
          {daily.map((x, i) => (
            <div
              key={i}
              className={`${colors[x.weather[0].icon]} flex flex-row justify-between rounded-xl p-2`}
            >
              <img src={imgUrl(x.weather[0].icon)} width={75} />

              <div className='flex flex-col items-end justify-center pr-2'>
                <div>{dayjs(x.dt * 1000).format('ddd DD')}</div>
                <div>{x.feels_like.day.toFixed(0)}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
