import { iconThemeData, baseImageUrl } from '../consts'
import { useWeatherQuery } from '../gql'
import { time } from '../util'

export function Weather(props: { lat: number; lon: number }) {
  const { lat, lon } = props
  const { fetching, data, error } = useWeatherQuery({ lat, lon })[0]

  if (fetching)
    return (
      <div className='row justify-center'>
        <div className='spinner' />
      </div>
    )

  if (error) return <div className='err'>{error.message}</div>

  const current = data?.weather.current
  const hourly = data?.weather.hourly
  const daily = data?.weather.daily

  return (
    <>
      <div
        className={`row justify-around rounded-xl p-3 ${
          iconThemeData[current?.weather?.at(0)?.icon!]
        }`}
      >
        <div className='col'>
          <img
            src={`${baseImageUrl}${current?.weather?.at(0)?.icon}@2x.png`}
            className='w-14'
            alt=''
          />
        </div>
        <div className='col text-center text-lg'>
          <div> {current?.weather?.at(0)?.main} </div>
          <div> {current?.weather?.at(0)?.description} </div>
        </div>
        <div className='col self-center text-xl'>
          <div> {current?.temp?.toFixed(0)}&deg;C </div>
        </div>
      </div>
      <div className='row space-x-2 overflow-scroll'>
        {hourly?.map((hour, i) => (
          <div
            className={`rounded-xl p-2 ${
              iconThemeData[hour?.weather?.at(0)?.icon!]
            }`}
            key={i}
          >
            <img
              src={`${baseImageUrl}${hour?.weather?.at(0)?.icon}.png`}
              className='max-w-fit'
              alt=''
            />
            <div className='row'>
              {`${time.getHours(hour.dt!)} ${time.getPostfix(hour.dt!)}`}
            </div>
            <div className='row'>{`${hour?.temp?.toFixed(0)}°C`}</div>
          </div>
        ))}
      </div>
      <div className='col space-y-2'>
        {daily?.map((day, i) => (
          <div
            className={`row justify-evenly rounded-xl p-2 ${
              iconThemeData[day.weather?.at(0)?.icon!]
            }`}
            key={i}
          >
            <div className='col text-center'>
              <img
                src={`${baseImageUrl}${day.weather?.at(0)?.icon}@2x.png`}
                alt=''
              />
              <div>
                {`${time.getDay(day.dt!)} ${time.getDayOfMonth(day.dt!)}`}
              </div>
            </div>
            <div className='col justify-evenly space-y-2'>
              <div className='row justify-evenly space-x-2'>
                <div className='col'>
                  <div>High</div>
                  <div>{`${day.temp?.max?.toFixed(0)}°C`}</div>
                </div>
                <div className='col'>
                  <div>Low</div>
                  <div>{`${day.temp?.min?.toFixed(0)}°C`}</div>
                </div>
              </div>
              <div className='row justify-evenly space-x-2'>
                <div className='col text-center'>
                  <div>Morning</div>
                  <div>{`${day.feels_like?.morn?.toFixed(0)}°C`}</div>
                </div>
                <div className='col text-center'>
                  <div>Day</div>
                  <div>
                    {day.feels_like?.day?.toFixed(0)}
                    &deg;C
                  </div>
                </div>
                <div className='col text-center'>
                  <div>Evening</div>
                  <div>{`${day.feels_like?.eve?.toFixed(0)}°C`}</div>
                </div>
                <div className='col text-center'>
                  <div>Night</div>
                  <div>{`${day.temp?.night?.toFixed(0)}°C`}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
