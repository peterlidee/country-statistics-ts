import ChartComponent from '../chart/ChartComponent'
import PropTypes from 'prop-types'

type Props = {
  countryCode: string
}

function SingleCountryPopulationChart({ countryCode }: Props) {
  return <ChartComponent countryCode={countryCode} />
}

SingleCountryPopulationChart.propTypes = {
  countryCode: PropTypes.string.isRequired,
}

export default SingleCountryPopulationChart
