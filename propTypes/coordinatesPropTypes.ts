import PropTypes from 'prop-types'

const coordinatesPropTypes = PropTypes.arrayOf(PropTypes.number)
const regionCoordinatesPropTypes = PropTypes.exact({
  coordinates: PropTypes.arrayOf(coordinatesPropTypes).isRequired,
  endpoint: PropTypes.string.isRequired,
})
const coordinatesDataPropTypes = PropTypes.exact({
  region: regionCoordinatesPropTypes.isRequired,
  subregion: regionCoordinatesPropTypes.isRequired,
})

export {
  coordinatesPropTypes,
  regionCoordinatesPropTypes,
  coordinatesDataPropTypes,
}
