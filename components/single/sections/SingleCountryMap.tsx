import MapWidget from '../map/MapWidget'
import { SingleCountryType } from '@/types/singleCountry'
import { CoordinatesData } from '@/types/coordinates'

type Props = {
  singleCountry: SingleCountryType
  coordinatesData: CoordinatesData
}

function SingleCountryMap({ singleCountry, coordinatesData }: Props) {
  return (
    <MapWidget
      singleCountry={singleCountry}
      coordinatesData={coordinatesData}
    />
  )
}

export default SingleCountryMap
