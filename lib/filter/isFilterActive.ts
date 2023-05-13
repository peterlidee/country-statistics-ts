import { NumberFieldSlug } from '@/components/fields/types/fields'
import { isNumberFieldSlug } from '@/components/fields/types/fieldsPredicates'

/**
 * checks if @filter is active
 * @param filter - string, region or number
 * @param activeRegions - string[]
 * @param activeNumberFilters - NumberFieldSlug[]
 * @returns boolean
 */

function isFilterActive(
  filter: string,
  activeRegions: string[],
  activeNumberFilters: NumberFieldSlug[],
) {
  if (isNumberFieldSlug(filter)) {
    return activeNumberFilters.includes(filter)
  }
  return activeRegions.length > 0
}

export default isFilterActive
