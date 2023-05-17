import RenderLabelValue from '../region/RenderLabelValue'
import ValidateNeighbouringCountries from '../neighbours/ValidateNeighbouringCountries'
import { SingleCountryType } from '@/types/singleCountry'

/**
 * display 2 boxes: region and neighbours
 * @param loading
 * @param error
 * @param data: SingleCountryType
 * @returns ReactNode
 */

type Props = {
  data: SingleCountryType
  error: boolean | undefined
  loading: boolean
}

const SingleCountryRegion = ({ data, error, loading }: Props) => (
  <div className='single-country__region'>
    <div className='single-country__box'>
      <RenderLabelValue loading={loading} value={data.region} label='region' />
      <RenderLabelValue
        loading={loading}
        value={data.subregion}
        label='subregion'
      />
      <RenderLabelValue
        loading={loading}
        value={data.capital}
        label='capital'
      />
    </div>
    <ValidateNeighbouringCountries
      loading={loading}
      error={error}
      data={data}
    />
  </div>
)

export default SingleCountryRegion
