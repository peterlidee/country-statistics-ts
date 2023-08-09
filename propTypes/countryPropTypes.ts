import PropTypes from 'prop-types'

const countryPropTypes = PropTypes.exact({
  country: PropTypes.string.isRequired,
  cca3: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  subregion: PropTypes.string.isRequired,
  area: PropTypes.number.isRequired,
  areaPrettyFormat: PropTypes.string.isRequired,
  population: PropTypes.number.isRequired,
  populationPrettyFormat: PropTypes.string.isRequired,
  density: PropTypes.number.isRequired,
  densityPrettyFormat: PropTypes.string.isRequired,
}).isRequired

export { countryPropTypes }
