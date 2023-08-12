import formatNumber from '../../../lib/helpers/formatNumber'
import roundNumber from '../../../lib/helpers/roundNumber'
import SingleCountryComponent from '../SingleCountryComponent'

import PropTypes from 'prop-types'

type Props = {
  population: number
  area: number
}

// Displays formatted population, area and density

function SingleCountryBasisStats({ population, area }: Props) {
  const populationPrettyFormat = formatNumber(roundNumber(population))
  const areaPrettyFormat = formatNumber(roundNumber(area))
  const densityPrettyFormat = formatNumber(
    roundNumber(Math.round(population / area)),
  )

  return (
    <SingleCountryComponent extraClass='basic-stats'>
      <div className='single-country__label'>Total population</div>
      <div className='single-country__value'>{populationPrettyFormat}</div>
      <div className='single-country__label'>Size</div>
      <div className='single-country__value'>{areaPrettyFormat} km²</div>
      {area > 0 && population > 0 && (
        <>
          <div className='single-country__label'>Population density</div>
          <div className='single-country__value'>
            {densityPrettyFormat} inhabitants / km²
          </div>
        </>
      )}
    </SingleCountryComponent>
  )
}

SingleCountryBasisStats.propTypes = {
  population: PropTypes.number.isRequired,
  area: PropTypes.number.isRequired,
}

export default SingleCountryBasisStats
