import fields from '../fields/fields'
import IconFilters from '../svgSnippets/IconFilters'
import FiltersToggle from './FiltersToggle'
import Collapse from '../general/Collapse'
import isFilterActive from '../../lib/filter/isFilterActive'
import RegionFilter from './region/RegionFilter'
import NumberFilter from './number/NumberFilter'

import { ActiveNumbersType, FilterDataType } from '@/types/filterData'
import { NumberFieldSlug } from '@/types/fields'
import { isNumberFieldSlug } from '@/types/fieldsPredicates'

import PropTypes from 'prop-types'
import {
  activeNumbersPropTypes,
  filterDataPropTypes,
} from '@/propTypes/filterDataPropTypes'

type Props = {
  filterData: FilterDataType
  activeHidden: NumberFieldSlug[]
  activeRegions: string[]
  activeNumbers: ActiveNumbersType
}

// Loop over active non-hidden filters and wrap them in Collapse elements
function Filters({
  filterData,
  activeHidden,
  activeRegions,
  activeNumbers,
}: Props) {
  // check if the field / filter is to be displayed
  const filters = ['regions']

  // add the active filters (hiddable && not in activeHidden)
  fields.map((field) => {
    if (field.displayToggle && !activeHidden.includes(field.slug)) {
      filters.push(field.slug)
    }
  })

  return (
    <aside className='site__filters'>
      <div className='filters__title'>
        <IconFilters />
        filter by
      </div>
      <FiltersToggle>
        {filters.map((filter) => (
          <Collapse
            key={`collapse-${filter}`}
            label={filter}
            boldLabel={isFilterActive(
              filter,
              activeRegions,
              activeNumbers.activeNumberFilters,
            )}
            extraClass='filter'
          >
            {filter == 'regions' && (
              <RegionFilter
                regionsAndSubregions={filterData.defaultRegionState}
                regionsAndSubregionsIndexes={filterData.regionIndexes}
                activeRegions={activeRegions}
              />
            )}
            {isNumberFieldSlug(filter) && (
              <NumberFilter
                filter={filter}
                currFilterData={filterData[filter]}
                activeNumbers={activeNumbers}
              />
            )}
          </Collapse>
        ))}
      </FiltersToggle>
    </aside>
  )
}

Filters.propTypes = {
  filterData: filterDataPropTypes.isRequired,
  activeHidden: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeRegions: PropTypes.arrayOf(PropTypes.string).isRequired,
  activeNumbers: activeNumbersPropTypes.isRequired,
}

export default Filters
