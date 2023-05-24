import RenderLabelValue from '../region/RenderLabelValue'
import NeighbouringCountries from '../neighbours/NeighbouringCountries'
import { SingleCountryType } from '@/types/singleCountry'
import { Neighbour } from '@/types/neighbour'

/**
 * display 2 boxes: region and neighbours
 * @param props.data: SingleCountryType
 * @param props.neighboursEndpoint - string
 * @param props.neighbours - Neighbour[]
 * @returns ReactNode
 */

type Props = {
  singleCountry: SingleCountryType
  neighboursEndpoint: string
  neighbours: Neighbour[]
}

const SingleCountryRegion = ({
  singleCountry,
  neighboursEndpoint,
  neighbours,
}: Props) => (
  <div className='single-country__region'>
    <div className='single-country__box'>
      <RenderLabelValue value={singleCountry.region} label='region' />
      <RenderLabelValue value={singleCountry.subregion} label='subregion' />
      <RenderLabelValue value={singleCountry.capital} label='capital' />
    </div>
    <NeighbouringCountries
      neighboursEndpoint={neighboursEndpoint}
      neighbours={neighbours}
    />
  </div>
)

export default SingleCountryRegion
