import { useData } from '@/hooks/useData'
import compilePopulationData from '@/lib/single/compilePopulationData'
import Source from '@/components/sources/Source'
import SingleCountryComponent from '../SingleCountryComponent'
import PopulationChartWidget from './PopulationChartWidget'

type Props = {
  countryCode: string
}

export default function ChartComponent({ countryCode }: Props) {
  const endpoint = `https://api.worldbank.org/v2/country/${countryCode.toLowerCase()}/indicator/SP.POP.TOTL.FE.IN;SP.POP.TOTL.MA.IN?format=json&source=2&date=2002:2021&per_page=100`
  const label =
    'api.worldbank.org/{country} Health Nutrition and Population Statistics'

  // make fetch
  const { data, isLoading, error, isError } = useData(
    'single-chart',
    countryCode,
    endpoint,
    {
      cacheTime: 60 * 60 * 1000, // one hour
      staleTime: Infinity, // don't refetch data
    },
  )

  // data -> calculate labels and values
  const {
    populationData: { years, femaleTotal, maleTotal, combinedTotal },
    extraError,
  } = compilePopulationData(data?.data, isError)

  // construct sources
  const sources = [
    <Source
      key='chartSource1'
      error={(error as Error | undefined) || extraError}
      loading={isLoading}
      endpoint={endpoint}
      label={label}
    />,
  ]

  return (
    <SingleCountryComponent extraClass='population-chart' sources={sources}>
      <PopulationChartWidget
        years={years}
        femaleTotal={femaleTotal}
        maleTotal={maleTotal}
        combinedTotal={combinedTotal}
      />
    </SingleCountryComponent>
  )
}
