import IconWindDirection from '../../svgSnippets/IconWindDirection'
import IconWeather from '../../svgSnippets/IconWeather'

/**
 * displays the weather widget
 * @param props.loading
 * @param props.error
 * @param props.data - data from data fetch
 * @param props.countryCode
 * @returns JSX.Element
 */

type Props = {
  loading: boolean
  error: undefined | Error
  data: any
  countryCode: string
}

// we don't use error or loading
// we rely on !data
const WeatherWidget = ({ loading, error, data, countryCode }: Props) => {
  const codes = {
    '01': 'clear',
    '02': 'few',
    '03': 'scat',
    '04': 'broken',
    '09': 'shower',
    '10': 'rain',
    '11': 'thunder',
    '13': 'snow',
    '50': 'mist',
    '404': 'nodata',
  }

  // we need to handle loading and error, so each value needs a backup value
  const capitalName: string = data?.name || countryCode

  const weatherObj = data?.weather[0]
  const description: string = weatherObj?.description || '___'
  // if there is icon, check for day of night, else return day
  const dayNight: 'day' | 'night' = weatherObj?.icon[2]
    ? weatherObj?.icon[2] == 'd'
      ? 'day'
      : 'night'
    : 'day'

  // if there is data, get the code, else use "404" as default
  const code: keyof typeof codes = weatherObj?.icon
    ? weatherObj.icon.slice(0, 2)
    : '404'
  const weather = codes[code]

  const tempMin =
    data?.main?.temp_min || data?.main?.temp_min === 0
      ? Math.ceil(data.main.temp_min)
      : '__'
  const tempMax =
    data?.main?.temp_max || data?.main?.temp_max === 0
      ? Math.ceil(data.main.temp_max)
      : '__'

  const windDeg: number =
    data?.wind?.deg || data?.wind?.deg === 0 ? data.wind.deg : 90
  const windSpeed =
    data?.wind?.speed || data?.wind?.speed === 0
      ? Math.round(data.wind.speed * 3.6)
      : '__'

  return (
    <div className='fullHeight weather'>
      <div className={`fullHeight ${dayNight}`}>
        <div className={`fullHeight ${weather}`}>
          <div className='fullHeight weather__grid'>
            <div className='weather__description'>weather in {capitalName}</div>

            <div className='weather__component weather__component--temperature'>
              <div className='weather__component__header'>temp</div>
              <div className='weather__component__body'>
                <div className='weather__temp--max'>{tempMax}</div>
                <div className='weather__temp--min'>{tempMin}</div>
              </div>
              <div className='weather__component__footer'>°C</div>
            </div>

            <div className='weather__component weather__component--state'>
              <IconWeather type={weather} />
            </div>

            <div className='weather__component weather__component--wind'>
              <div className='weather__component__header'>wind</div>
              <div className='weather__component__body'>
                <div className='weather__wind-direction'>
                  <IconWindDirection deg={windDeg} />
                </div>
                <div className='weather__wind-speed'>{windSpeed}</div>
              </div>
              <div className='weather__component__footer'>km/h</div>
            </div>

            <div className='weather__description'>{description}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherWidget
