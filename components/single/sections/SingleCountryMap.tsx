import MapWidget from '../map/MapWidget'
import { SingleCountryType } from '@/types/singleCountry'
import { CoordinatesData } from '@/types/coordinates'

import PropTypes from 'prop-types'
import { singleCountryPropTypes } from '@/propTypes/singleCountryPropTypes'
import { coordinatesDataPropTypes } from '@/propTypes/coordinatesPropTypes'

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

SingleCountryMap.propTypes = {
  singleCountry: singleCountryPropTypes.isRequired,
  coordinatesData: coordinatesDataPropTypes.isRequired,
}

export default SingleCountryMap
