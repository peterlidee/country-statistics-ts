import IconWindDirection from '../../svgSnippets/IconWindDirection'
import IconWeather from '../../svgSnippets/IconWeather'
import compileWeatherData from '@/lib/single/compileWeatherData'

import PropTypes from 'prop-types'

type Props = {
  data: unknown
  code: string
}

// we don't use error or loading
// we rely on !data
const WeatherWidget = ({ data, code }: Props) => {
  const {
    capitalName,
    description,
    dayNight,
    weather,
    tempMin,
    tempMax,
    windDeg,
    windSpeed,
  } = compileWeatherData(data, code)

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

WeatherWidget.propTypes = {
  // might be empty or loading
  data: PropTypes.object,
  code: PropTypes.string.isRequired,
}

export default WeatherWidget
