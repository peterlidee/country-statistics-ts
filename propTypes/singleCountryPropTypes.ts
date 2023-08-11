import PropTypes from 'prop-types'

const singleCountryPropTypes = PropTypes.exact({
  countryName: PropTypes.string.isRequired,
  tld: PropTypes.string.isRequired,
  cca2: PropTypes.string.isRequired,
  cca3: PropTypes.string.isRequired,
  capital: PropTypes.string.isRequired,
  region: PropTypes.string.isRequired,
  subregion: PropTypes.string.isRequired,
  borders: PropTypes.arrayOf(PropTypes.string).isRequired,
  area: PropTypes.number.isRequired,
  population: PropTypes.number.isRequired,
  flag: PropTypes.string.isRequired,
  coatOfArms: PropTypes.string.isRequired,
})

export { singleCountryPropTypes }
