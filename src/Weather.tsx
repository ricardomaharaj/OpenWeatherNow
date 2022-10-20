import { useWeatherQuery } from './gql'

const IMGURL = 'https://openweathermap.org/img/wn/'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const TimeUtil = {
    getHours(time: number) {
        let date = new Date(time * 1000)
        let hours = date.getHours()
        if (hours > 12) {
            hours = hours - 12
        }
        if (hours === 0) {
            hours = 12
        }
        return hours
    },
    getMinutes(time: number) {
        let date = new Date(time * 1000)
        return date.getMinutes()
    },
    getPostfix(time: number) {
        let postfix = 'AM'
        let date = new Date(time * 1000)
        if (date.getHours() > 12) {
            postfix = 'PM'
        }
        return postfix
    },
    getDay(time: number) {
        return DAYS[new Date(time * 1000).getDay()]
    },
    getDayOfMonth(time: number) {
        return new Date(time * 1000).getDate()
    }
}

const IconThemeData: any = {
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

interface HomeProps {
    lat: number
    lon: number
}

export function Weather({ lat, lon }: HomeProps) {
    let [res] = useWeatherQuery({ lat, lon })
    let { fetching, data, error } = res

    if (fetching) return <div>loading...</div>
    if (error)
        return (
            <div className='bg-red-800 rounded-xl p-2 text-white'>
                {error.message}
            </div>
        )

    let current = data?.weather.current
    let hourly = data?.weather.hourly
    let daily = data?.weather.daily

    return (
        <>
            <div
                className={`flex flex-row rounded-xl p-3 justify-around ${
                    IconThemeData[current?.weather?.at(0)?.icon!]
                }`}
            >
                <div className='flex flex-col'>
                    <img
                        src={`${IMGURL}${current?.weather?.at(0)?.icon}@2x.png`}
                        className='w-14'
                        alt=''
                    />
                </div>
                <div className='flex flex-col text-center text-lg'>
                    <div> {current?.weather?.at(0)?.main} </div>
                    <div> {current?.weather?.at(0)?.description} </div>
                </div>
                <div className='flex flex-col self-center text-xl'>
                    <div> {current?.temp?.toFixed(0)}&deg;C </div>
                </div>
            </div>
            <div className='flex flex-row space-x-2 overflow-scroll'>
                {hourly?.map((x, i) => (
                    <div
                        className={`rounded-xl p-2 ${
                            IconThemeData[x?.weather?.at(0)?.icon!]
                        }`}
                        key={i}
                    >
                        <img
                            src={`${IMGURL}${x?.weather?.at(0)?.icon}.png`}
                            className='max-w-fit'
                            alt=''
                        />
                        <div className='flex flex-row'>
                            {`${TimeUtil.getHours(x.dt!)} ${TimeUtil.getPostfix(
                                x.dt!
                            )}`}
                        </div>
                        <div className='flex flex-row'>{`${x?.temp?.toFixed(
                            0
                        )}°C`}</div>
                    </div>
                ))}
            </div>
            <div className='flex flex-col space-y-2'>
                {daily?.map((x, i) => (
                    <div
                        className={`flex flex-row justify-evenly rounded-xl p-2 ${
                            IconThemeData[x.weather?.at(0)?.icon!]
                        }`}
                        key={i}
                    >
                        <div className='flex flex-col text-center'>
                            <img
                                src={`${IMGURL}${
                                    x.weather?.at(0)?.icon
                                }@2x.png`}
                                alt=''
                            />
                            <div>
                                {`${TimeUtil.getDay(
                                    x.dt!
                                )} ${TimeUtil.getDayOfMonth(x.dt!)}`}
                            </div>
                        </div>
                        <div className='flex flex-col space-y-2 justify-evenly'>
                            <div className='flex flex-row space-x-2 justify-evenly'>
                                <div className='flex flex-col'>
                                    <div>High</div>
                                    <div>{`${x.temp?.max?.toFixed(0)}°C`}</div>
                                </div>
                                <div className='flex flex-col'>
                                    <div>Low</div>
                                    <div>{`${x.temp?.min?.toFixed(0)}°C`}</div>
                                </div>
                            </div>
                            <div className='flex flex-row space-x-2 justify-evenly'>
                                <div className='flex flex-col text-center'>
                                    <div>Morning</div>
                                    <div>
                                        {`${x.feels_like?.morn?.toFixed(0)}°C`}
                                    </div>
                                </div>
                                <div className='flex flex-col text-center'>
                                    <div>Day</div>
                                    <div>
                                        {x.feels_like?.day?.toFixed(0)}
                                        &deg;C
                                    </div>
                                </div>
                                <div className='flex flex-col text-center'>
                                    <div>Evening</div>
                                    <div>
                                        {`${x.feels_like?.eve?.toFixed(0)}°C`}
                                    </div>
                                </div>
                                <div className='flex flex-col text-center'>
                                    <div>Night</div>
                                    <div>
                                        {`${x.temp?.night?.toFixed(0)}°C`}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
