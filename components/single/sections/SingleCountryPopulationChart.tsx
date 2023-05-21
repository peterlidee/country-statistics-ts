import SingleCountryFetch from '../SingleCountryFetch'
import PopulationChartWidget from '../chart/PopulationChartWidget'
import extractPopulationChartData from '../../../lib/single/extractPopulationChartData'

import PropTypes from 'prop-types'

type Props = {
  countryCode: string
}

function SingleCountryPopulationChart({ countryCode }: Props) {
  // data endpoint info

  /*
  // https://databank.worldbank.org/source/health-nutrition-and-population-statistics/preview/on
  Population, total(SP.POP.TOTL) // don't use total pop, just add them
  Population, male (SP.POP.TOTL.MA.IN)
  Population, female(SP.POP.TOTL.FE.IN)
  
  // working example
  // https://api.worldbank.org/v2/country/bel/indicator/SP.POP.TOTL.FE.IN;SP.POP.TOTL.MA.IN?format=json&source=2&year=2001:2020&per_page=200
  
  */

  const endpoint = `https://api.worldbank.org/v2/country/${countryCode.toLowerCase()}/indicator/SP.POP.TOTL.FE.IN;SP.POP.TOTL.MA.IN?format=json&source=2&date=2002:2021&per_page=100`
  const label =
    'api.worldbank.org/{country} Health Nutrition and Population Statistics'

  return (
    <SingleCountryFetch
      endpoint={endpoint}
      label={label}
      extraClass='population-chart'
      type='population'
    >
      {(isLoading, error, data) => {
        const isArray = Array.isArray(data)
        // no data -> send dummy data
        if (
          error ||
          (isLoading && !data) ||
          !data ||
          !isArray ||
          data?.[0]?.message ||
          data?.[0]?.total === 0
        ) {
          return (
            <PopulationChartWidget
              years={[]}
              femaleTotal={[]}
              maleTotal={[]}
              combinedTotal={[]}
            />
          )
        }
        // data -> calculate labels and values
        const { years, femaleTotal, maleTotal, combinedTotal } =
          extractPopulationChartData(data[1])
        return (
          <PopulationChartWidget
            years={years}
            femaleTotal={femaleTotal}
            maleTotal={maleTotal}
            combinedTotal={combinedTotal}
          />
        )
      }}
    </SingleCountryFetch>
  )
}

SingleCountryPopulationChart.propTypes = {
  countryCode: PropTypes.string.isRequired,
}

export default SingleCountryPopulationChart
