import PropTypes from 'prop-types'

const neighbourPropTypes = PropTypes.exact({
  countryName: PropTypes.string.isRequired,
  cca3: PropTypes.string.isRequired,
})

export { neighbourPropTypes }
