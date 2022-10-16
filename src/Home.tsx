import { Fragment } from 'react'
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
    '01d': 'bg-yellow-300', // clear sky
    '02d': 'bg-yellow-200', // few clouds
    '03d': 'bg-slate-300', // scattered clouds
    '04d': 'bg-slate-400', // broken clouds
    '09d': 'bg-sky-400', // shower rain
    '10d': 'bg-blue-400', // rain
    '11d': 'bg-purple-300', // thunderstorm
    '13d': 'bg-slate-200', // snow
    '50d': 'bg-slate-500', // mist
    // NIGHT
    '01n': 'bg-slate-300', // clear sky
    '02n': 'bg-slate-400', // few clouds
    '03n': 'bg-slate-400', // scattered clouds
    '04n': 'bg-slate-400', // broken clouds
    '09n': 'bg-sky-400', // shower rain
    '10n': 'bg-blue-400', // rain
    '11n': 'bg-purple-300', // thunderstorm
    '13n': 'bg-slate-200', // snow
    '50n': 'bg-slate-500' // mist
}

interface HomeProps {
    lat: number
    lon: number
}

export function Home({ lat, lon }: HomeProps) {
    let [res] = useWeatherQuery({ lat, lon })
    let { fetching, data, error } = res

    const load_silhouette = (
        <>
            <div className='bg-slate-900 rounded-xl h-[80px]' />
            <div className='row overflow-scroll space-x-2'>
                {new Array(6)
                    .fill(
                        <div className='bg-slate-900 p-2 rounded-xl w-[66px] h-[114px]' />
                    )
                    .map((x, i) => (
                        <Fragment key={i}>{x}</Fragment>
                    ))}
            </div>
            {new Array(6)
                .fill(
                    <div className='bg-slate-900 rounded-xl w-full h-[140px]' />
                )
                .map((x, i) => (
                    <Fragment key={i}>{x}</Fragment>
                ))}
        </>
    )

    if (fetching) return load_silhouette
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
                className={`row rounded-xl p-3 justify-around ${
                    IconThemeData[current?.weather?.at(0)?.icon!]
                }`}
            >
                <div className='col'>
                    <img
                        className='w-14'
                        src={`${IMGURL}/${
                            current?.weather?.at(0)?.icon
                        }@2x.png`}
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
                {hourly?.map((x, i) => (
                    <div
                        className={`rounded-xl p-2 ${
                            IconThemeData[x?.weather?.at(0)?.icon!]
                        }`}
                        key={i}
                    >
                        <img
                            className='max-w-fit'
                            src={`${IMGURL}/${x?.weather?.at(0)?.icon}.png`}
                            alt=''
                        />
                        <div className='row'>
                            {`${TimeUtil.getHours(x.dt!)} ${TimeUtil.getPostfix(
                                x.dt!
                            )}`}
                        </div>
                        <div className='row'>{`${x?.temp?.toFixed(0)}°C`}</div>
                    </div>
                ))}
            </div>
            <div className='col space-y-2'>
                {daily?.map((x, i) => (
                    <div
                        className={`row justify-evenly rounded-xl p-2 ${
                            IconThemeData[x.weather?.at(0)?.icon!]
                        }`}
                        key={i}
                    >
                        <div className='col text-center'>
                            <img
                                className='max-w-fit'
                                src={`${IMGURL}/${
                                    x.weather?.at(0)?.icon
                                }@2x.png`}
                                alt=''
                            />
                            <div className=''>
                                {`${TimeUtil.getDay(
                                    x.dt!
                                )} ${TimeUtil.getDayOfMonth(x.dt!)}`}
                            </div>
                        </div>
                        <div className='col space-y-2 justify-evenly'>
                            <div className='row space-x-2 justify-evenly'>
                                <div className='col'>
                                    <div>High</div>
                                    <div>{`${x.temp?.max?.toFixed(0)}°C`}</div>
                                </div>
                                <div className='col'>
                                    <div>Low</div>
                                    <div>{`${x.temp?.min?.toFixed(0)}°C`}</div>
                                </div>
                            </div>
                            <div className='row space-x-2 justify-evenly'>
                                <div className='col text-center'>
                                    <div>Morning</div>
                                    <div>
                                        {`${x.feels_like?.morn?.toFixed(0)}°C`}
                                    </div>
                                </div>
                                <div className='col text-center'>
                                    <div>Day</div>
                                    <div>
                                        {x.feels_like?.day?.toFixed(0)}
                                        &deg;C
                                    </div>
                                </div>
                                <div className='col text-center'>
                                    <div>Evening</div>
                                    <div>
                                        {`${x.feels_like?.eve?.toFixed(0)}°C`}
                                    </div>
                                </div>
                                <div className='col text-center'>
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
