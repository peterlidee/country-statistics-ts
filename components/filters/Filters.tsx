import fields from '../fields/fields'
import IconFilters from '../svgSnippets/IconFilters'
import FiltersToggle from './FiltersToggle'
import Collapse from '../general/Collapse'
import isFilterActive from '../../lib/filter/isFilterActive'
import RegionFilter from './region/RegionFilter'
import NumberFilter from './number/NumberFilter'

import PropTypes from 'prop-types'
import { CurrentSelectionsType, FilterDataType } from '@/types/filterData'
import { NumberFieldSlug } from '../fields/types/fields'
import { isNumberFieldSlug } from '../fields/types/fieldsPredicates'

type Props = {
  filterData: FilterDataType
  activeHidden: NumberFieldSlug[]
  activeRegions: string[]
  activeNumbers: {
    activeNumberFilters: NumberFieldSlug[]
    currentSelections: CurrentSelectionsType
  }
}

/**
 * Loop over active non-hidden filters and wrap them in Collapse elements
 * @param props.filterData - FilterDataType
 * @param props.activeHidden - NumberFieldSlug[]
 * @param props.activeRegions - string[]
 * @param props.activeNumbers - { activeNumberFilters, currentSelections }
 * @returns JSX.Element Filters component
 */

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
            boldLabel={isFilterActive(filter, activeRegions, activeNumbers)}
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
  filterData: PropTypes.object.isRequired,
  activeHidden: PropTypes.array.isRequired,
  activeRegions: PropTypes.array.isRequired,
  activeNumbers: PropTypes.object.isRequired,
}

export default Filters
