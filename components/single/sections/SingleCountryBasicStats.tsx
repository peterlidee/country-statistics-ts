import formatNumber from '../../../lib/helpers/formatNumber'
import roundNumber from '../../../lib/helpers/roundNumber'
import BoxWrapper from '../../general/BoxWrapper'

type Props = {
  population: number
  area: number
}

/**
 * Displays formatted population, area and density
 * @param props.population
 * @param props.area
 * @returns ReactNode
 */

function SingleCountryBasisStats({ population, area }: Props) {
  const populationPrettyFormat = formatNumber(roundNumber(population))
  const areaPrettyFormat = formatNumber(roundNumber(area))
  const densityPrettyFormat = formatNumber(
    roundNumber(Math.round(population / area)),
  )

  return (
    <BoxWrapper name='basic-stats'>
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
    </BoxWrapper>
  )
}

export default SingleCountryBasisStats
