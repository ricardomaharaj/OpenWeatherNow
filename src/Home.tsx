import { useState } from 'react'
import { Daily, useWeatherQuery } from './gql'
import { Spinner } from './Spinner'

const imgurl = 'https://openweathermap.org/img/wn/'

const DAYS = [
    'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'
]

const TimeUtil = {
    getHours(time: number) {
        let date = new Date(time * 1000)
        let hours = date.getHours()
        if (hours > 12) {
            hours = (hours - 12)
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
    '50n': 'bg-slate-500', // mist
}

interface Props { lat: number, lon: number }
export function Home({ lat, lon }: Props) {

    let [res,] = useWeatherQuery({ lat, lon })
    let { fetching, data, error } = res

    let current = data?.weather.current
    let minutely = data?.weather.minutely?.filter(x => x.precipitation! > 0)
    let hourly = data?.weather.hourly
    let daily = data?.weather.daily

    if (fetching) return <Spinner />
    if (error) return <> {error.message} </>

    return <>
        <div className='container mx-auto space-y-4'>
            <div className={`row rounded-xl p-3 justify-around ${IconThemeData[current?.weather?.at(0)?.icon!]}`}>
                <div className='col'>
                    <img className=' w-14' src={`${imgurl}/${current?.weather?.at(0)?.icon}@2x.png`} alt='' />
                </div>
                <div className='col text-center text-lg'>
                    <div> {current?.weather?.at(0)?.main} </div>
                    <div> {current?.weather?.at(0)?.description} </div>
                </div>
                <div className='col self-center text-xl'>
                    <div> {current?.temp?.toFixed(0)}&deg;C </div>
                </div>
            </div>
            {minutely?.length! >= 1 && <>
                <div className='text-white'>Precipitation in the next hour:</div>
                <div className='row space-x-2 overflow-scroll'>
                    {minutely
                        ?.map((x, i) =>
                            <div className={`rounded-xl p-2 bg-sky-400`} key={i}>
                                <div className='row'>
                                    {`${TimeUtil.getHours(x.dt!)}:${TimeUtil.getMinutes(x.dt!).toString().padStart(2, '0')}`}
                                </div>
                                <div className='row'>
                                    {x?.precipitation!.toPrecision(2).padEnd(4, '0')}
                                </div>
                            </div>
                        )}
                </div>
            </>}
            <div className='row space-x-2 overflow-scroll'>
                {hourly
                    ?.map((x, i) =>
                        <div className={`rounded-xl p-2 ${IconThemeData[x?.weather?.at(0)?.icon!]}`} key={i}>
                            <img className='max-w-fit' src={`${imgurl}/${x?.weather?.at(0)?.icon}@2x.png`} alt='' />
                            <div className='row'>
                                {`${TimeUtil.getHours(x.dt!)} ${TimeUtil.getPostfix(x.dt!)}`}
                            </div>
                            <div className='row'> {x?.temp?.toFixed(0)}&deg;C </div>
                        </div>
                    )}
            </div>
            <div className='col space-y-2'>
                {daily?.map((x, i) => <Day day={x} key={i} />)}
            </div>
        </div>
    </>
}


function Day({ day }: { day: Daily }) {

    let [feelsLike, setFeelsLike] = useState(false)

    return <div className={`row justify-evenly rounded-xl p-2 ${IconThemeData[day.weather?.at(0)?.icon!]}`} onClick={() => setFeelsLike(!feelsLike)} >
        <div className='col text-center'>
            <img className='max-w-fit' src={`${imgurl}/${day.weather?.at(0)?.icon}@2x.png`} alt='' />
            <div className=''>{TimeUtil.getDay(day.dt!)} {TimeUtil.getDayOfMonth(day.dt!)}</div>
            {feelsLike && <> feels like </>}
        </div>
        <div className='col space-y-2 justify-evenly'>
            <div className='row space-x-2 justify-evenly'>
                <div className='col'>
                    <div>High </div>
                    <div>{day.temp?.max?.toFixed(0)}&deg;C</div>
                </div>
                <div className='col'>
                    <div>Low </div>
                    <div>{day.temp?.min?.toFixed(0)}&deg;C</div>
                </div>
            </div>
            <div className='row space-x-2 justify-evenly'>
                <div className='col text-center'>
                    <div>Morning</div>
                    {feelsLike ? <div>{day.feels_like?.morn?.toFixed(0)}&deg;C</div> : <div>{day.temp?.morn?.toFixed(0)}&deg;C</div>}
                </div>
                <div className='col text-center'>
                    <div>Day</div>
                    {feelsLike ? <div>{day.feels_like?.day?.toFixed(0)}&deg;C</div> : <div>{day.temp?.day?.toFixed(0)}&deg;C</div>}
                </div>
                <div className='col text-center'>
                    <div>Evening</div>
                    {feelsLike ? <div>{day.feels_like?.eve?.toFixed(0)}&deg;C</div> : <div>{day.temp?.eve?.toFixed(0)}&deg;C</div>}
                </div>
                <div className='col text-center'>
                    <div>Night</div>
                    <div>{day.temp?.night?.toFixed(0)}&deg;C</div>
                </div>
            </div>
        </div>
    </div>
}
