import { useWeatherData } from './useWeatherData'
import SingleCountryComponent from '../SingleCountryComponent'
import Source from '@/components/sources/Source'
import WeatherWidget from './WeatherWidget'

type Props = {
  cca2: string
  capitalName: string
}

export default function WeatherComponent({ cca2, capitalName }: Props) {
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
    capitalName,
  )},${cca2}&APPID=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}&units=metric`
  const label = 'Openweather API'
  // fetch data
  const { data, error, isLoading } = useWeatherData(cca2, endpoint)

  const source = (
    <Source
      error={error as Error | undefined}
      loading={isLoading}
      endpoint={endpoint}
      label={label}
      key='source1'
    />
  )

  return (
    <SingleCountryComponent extraClass='weather' sources={[source]}>
      <WeatherWidget data={data?.data} code={cca2} />
    </SingleCountryComponent>
  )
}
