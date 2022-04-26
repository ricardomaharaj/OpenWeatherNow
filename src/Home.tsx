import { useState } from 'react'
import { useWeatherQuery } from './gql'

const imgurl = 'http://openweathermap.org/img/wn/'

interface Props { lat: number, lon: number }
export function Home({ lat, lon }: Props) {

    let [darkMode, setDarkMode] = useState(true)

    let [res,] = useWeatherQuery(lat, lon)
    let { fetching, data, error } = res

    let current = data?.weather.current
    let minutely = data?.weather.minutely
    let hourly = data?.weather.hourly
    let daily = data?.weather.daily

    document.querySelector('html')?.setAttribute('class', `${darkMode ? 'bg-slate-900 text-white' : 'bg-white'}`)

    let weatherTheme = (id: number, darkMode: boolean) => {
        let stringID = id.toString()
        if (darkMode) {
            if (stringID.startsWith('2')) return 'bg-slate-800'
            if (stringID.startsWith('3')) return 'bg-blue-800'
            if (stringID.startsWith('5')) return 'bg-blue-900'
            if (stringID.startsWith('6')) return 'bg-slate-800'
            if (stringID === '800') return 'bg-slate-800'
            if (stringID.startsWith('8')) return 'bg-slate-700'
        } else {
            if (stringID.startsWith('2')) return 'bg-slate-500'
            if (stringID.startsWith('3')) return 'bg-blue-100'
            if (stringID.startsWith('5')) return 'bg-blue-300'
            if (stringID.startsWith('6')) return 'bg-slate-300'
            if (stringID === '800') return 'bg-slate-100'
            if (stringID.startsWith('8')) return 'bg-slate-300'
        }
    }
    if (fetching) return <> loading... </>
    if (error) return <> {error.message} </>

    return <>
        <div className='container mx-auto space-y-1'>
            <div className='row justify-end'>
                <div onClick={() => { setDarkMode(!darkMode) }}> {darkMode ? 'DARK' : 'LIGHT'} </div>
            </div>
            <div className={`row rounded-xl p-2 space-x-2 ${weatherTheme(current?.weather?.at(0)?.id!, darkMode)}`}>
                <div className='col'>
                    <img src={`${imgurl}/${current?.weather?.at(0)?.icon}.png`} alt='' />
                </div>
                <div className='col'>
                    <div> {current?.weather?.at(0)?.main} </div>
                    <div> {current?.weather?.at(0)?.description} </div>
                </div>
            </div>
            <div>
                By The Minute:
            </div>
            <div className='row space-x-2 overflow-scroll'>
                {minutely?.map(x => <>
                    <div className={`rounded-xl p-2 ${x?.precipitation! >= 0.75 ? (darkMode ? 'bg-blue-900' : 'bg-blue-300') : weatherTheme(current?.weather?.at(0)?.id!, darkMode)}`}>
                        <div className='row'>
                            {`${new Date(x?.dt! * 1000).getHours()}`.padStart(2, '0')}:{`${new Date(x?.dt! * 1000).getMinutes()}`.padStart(2, '0')}
                        </div>
                        <div className='row'>
                            {x?.precipitation!.toPrecision(2).padEnd(4, '0')}
                        </div>
                    </div>
                </>)}
            </div>
            <div>
                By The Hour:
            </div>
            <div className='row space-x-2 overflow-scroll'>
                {hourly?.map(x => <>
                    <div className={`rounded-xl p-2 ${weatherTheme(x?.weather?.at(0)?.id!, darkMode)}`}>
                        <img className='max-w-xl' src={`${imgurl}/${x?.weather?.at(0)?.icon}.png`} alt='' />
                        <div className='row'>
                            {`${new Date(x?.dt! * 1000).getHours()}`.padStart(2, '0')}:{`${new Date(x?.dt! * 1000).getMinutes()}`.padStart(2, '0')}
                        </div>
                        <div className='row'> {x?.temp?.toFixed(0)} </div>
                    </div>
                </>)}
            </div>
            <div>
                By The Day:
            </div>
            <div className='row space-x-2 overflow-scroll'>
                {daily?.map(x => <>
                    <div className={`rounded-xl p-2 ${weatherTheme(x?.weather?.at(0)?.id!, darkMode)}`}>
                        <img className='max-w-xl' src={`${imgurl}/${x?.weather?.at(0)?.icon}.png`} alt='' />
                        <div className='row'> {new Date(x?.dt! * 1000).toDateString().split(' ')[0]} </div>
                        <div className='row'>{x?.temp?.max?.toFixed(0)}/{x?.temp?.min?.toFixed(0)}</div>
                    </div>
                </>)}
            </div>
        </div>
    </>
}
