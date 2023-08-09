import PropTypes from 'prop-types'

const fieldPropTypes = PropTypes.exact({
  sortAscDefault: PropTypes.bool.isRequired,
  legend: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  displayToggle: PropTypes.bool.isRequired,
  sortType: PropTypes.string.isRequired,
})

export { fieldPropTypes }
