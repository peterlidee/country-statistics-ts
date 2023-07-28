import WeatherComponent from '../weather/WeatherComponent'

type Props = {
  cca2: string
  capitalName: string
}

export default function SingleCountryWeather2({ cca2, capitalName }: Props) {
  // when there is no capitalName, show nothing
  // we use seperate component so we don't have to do fetch, sort of conditional fetch
  if (capitalName === '') return <div className='single-country__weather' />
  return <WeatherComponent cca2={cca2} capitalName={capitalName} />
}
