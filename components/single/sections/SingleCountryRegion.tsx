import RenderLabelValue from '../region/RenderLabelValue'
import NeighbouringCountries from '../neighbours/NeighbouringCountries'
import { SingleCountryType } from '@/types/singleCountry'
import { Neighbour } from '@/types/neighbour'
import SingleCountryBox from '@/components/general/SingleCountryBox'

// display 2 boxes: region and neighbours
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
    <SingleCountryBox>
      <RenderLabelValue value={singleCountry.region} label='region' />
      <RenderLabelValue value={singleCountry.subregion} label='subregion' />
      <RenderLabelValue value={singleCountry.capital} label='capital' />
    </SingleCountryBox>
    <NeighbouringCountries
      neighboursEndpoint={neighboursEndpoint}
      neighbours={neighbours}
    />
  </div>
)

export default SingleCountryRegion
