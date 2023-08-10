import PropTypes from 'prop-types'

const numberFilterDataPropTypes = PropTypes.exact({
  sliderStart: PropTypes.number.isRequired,
  sliderEnd: PropTypes.number.isRequired,
  sliderStep: PropTypes.number.isRequired,
  countryMin: PropTypes.number.isRequired,
  countryMax: PropTypes.number.isRequired,
})

const defaultRegionStatePropTypes = PropTypes.objectOf(
  PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
)

const regionIndexesPropTypes = PropTypes.objectOf(
  PropTypes.arrayOf(PropTypes.number),
)

const filterDataPropTypes = PropTypes.exact({
  defaultRegionState: defaultRegionStatePropTypes.isRequired,
  regionIndexes: regionIndexesPropTypes.isRequired,
  area: numberFilterDataPropTypes.isRequired,
  density: numberFilterDataPropTypes.isRequired,
  population: numberFilterDataPropTypes.isRequired,
})

const currentSelectionsPropTypes = PropTypes.objectOf(
  PropTypes.arrayOf(PropTypes.number),
)
const activeNumbersPropTypes = PropTypes.exact({
  activeNumberFilters: PropTypes.arrayOf(PropTypes.string).isRequired,
  currentSelections: currentSelectionsPropTypes.isRequired,
})

export { filterDataPropTypes, activeNumbersPropTypes }
