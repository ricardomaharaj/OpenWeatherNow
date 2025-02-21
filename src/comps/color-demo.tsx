import { colors } from '~/util/colors'

/** used to demo color and contrast for different weather conditions */
export function ColorDemo() {
  return (
    <>
      <div className='flex flex-col gap-2 p-2 font-bold'>
        {Object.keys(colors).map((key) => (
          <div
            className={`${colors[key]} flex flex-row items-center justify-between rounded-xl p-2`}
            key={key}
          >
            <img
              src={`https://openweathermap.org/img/wn/${key}@2x.png`}
              width={75}
            />
            <div className='pr-2'>Text</div>
          </div>
        ))}
      </div>
    </>
  )
}
