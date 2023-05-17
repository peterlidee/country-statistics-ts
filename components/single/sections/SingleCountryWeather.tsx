/**
 * call weatherComponent when valid props, else fallback
 * @param props.countryCode
 * @param props.loading
 * @param props.error
 * @param props.cca2
 * @param props.capitalName
 */

import Placeholder from '../../svgSnippets/Placeholder'
import BoxWrapper from '../../general/BoxWrapper'
import SingleCountryFetch from '../SingleCountryFetch'
import WeatherWidget from '../weather/WeatherWidget'

type Props = {
  countryCode: string
  loading: boolean
  error: undefined | boolean
  cca2: string
  capitalName: string
}

function SingleCountryWeather({
  countryCode,
  loading,
  error,
  cca2,
  capitalName,
}: Props) {
  // first handle the loading, error and data states of the parent component
  // no longer usefull with SSG but leaving it in for now
  if ((loading && capitalName === '') || error)
    return (
      <BoxWrapper name='placeholder'>
        <Placeholder />
      </BoxWrapper>
    )
  // no capital, no weather widget
  if (!loading && !error && capitalName === '')
    return <div className='single-country__weather'></div>

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    capitalName,
  )},${cca2}&APPID=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}&units=metric`
  const label = 'Openweather API'

  return (
    <SingleCountryFetch endpoint={endpoint} extraClass='weather' label={label}>
      {(isLoading, error, data) => (
        <WeatherWidget
          loading={isLoading}
          error={error}
          data={data}
          countryCode={countryCode}
        />
      )}
    </SingleCountryFetch>
  )
}

export default SingleCountryWeather
