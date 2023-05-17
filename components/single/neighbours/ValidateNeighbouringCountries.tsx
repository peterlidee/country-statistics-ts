import { SingleCountryType } from '@/types/singleCountry'
import NeighbourComponent from './NeighbourComponent'
import NeighbouringCountries from './NeighbouringCountries'

type Props = {
  error: boolean | undefined
  loading: boolean
  data: SingleCountryType
}

function ValidateNeighbouringCountries({ loading, error, data }: Props) {
  // we first need to handle the loading, error and data of the parent components fetch
  // if there's loading and no data
  // (if there's loading and data, we just display the previous data)
  if (loading && !data) return <NeighbourComponent>...</NeighbourComponent>

  // if error
  if (error) return <NeighbourComponent>No data found.</NeighbourComponent>

  // data is garanteed
  // no borders
  if (!loading && !error && data.borders.length === 0)
    return <NeighbourComponent>None (island).</NeighbourComponent>

  return <NeighbouringCountries borders={data.borders} />
}

export default ValidateNeighbouringCountries
