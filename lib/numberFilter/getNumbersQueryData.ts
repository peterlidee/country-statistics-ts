import fieldsData from '../../components/fields/fieldsData'
import validateNumbersQuery from './validateNumbersQuery'
import isNumberFilterActive from './isNumberFilterActive'
import { ParsedUrlQuery } from 'querystring'
import { FilterDataType } from '@/types/filterData'
import { NumberFieldSlug, isNumberFieldData } from '@/types/fieldsData'

// this function returns
// - activeNumberFilters: array of string
// - currentSelections: object with all numberFilters as keys and either the current selection or defaults as values

export default function getNumberQueryData(
  hiddenFields: NumberFieldSlug[],
  routerQuery: ParsedUrlQuery,
  filterData: FilterDataType,
) {
  // 1. get NumberFieldsData
  const numberFieldsData = fieldsData.filter(isNumberFieldData)

  // 2. filter our the hidden fields (we know what's hidden from hide router.query)
  const visibleNumberFieldsData = numberFieldsData.filter((numberFieldData) =>
    hiddenFields.includes(numberFieldData.slug),
  )

  // 3. get the slugs of visible NumberFieldsData
  const visibleNumberFieldsSlugs = visibleNumberFieldsData.map(
    (item) => item.slug,
  )

  // 4. for each visibleNumberFieldsSlugs, get the value from query and validate it (or set to default)
  // mapped type definition [slug in NumberFieldSlug]
  const currentSelections: { [slug in NumberFieldSlug]: [number, number] } = {
    area: [0, 0],
    population: [0, 0],
    density: [0, 0],
  }

  visibleNumberFieldsSlugs.map((visibleNumberFieldsSlug) => {
    const currentSelection = validateNumbersQuery(
      routerQuery[visibleNumberFieldsSlug] as string | undefined,
      [
        filterData[visibleNumberFieldsSlug].sliderStart,
        filterData[visibleNumberFieldsSlug].sliderEnd,
      ],
    )
    // add to currentSelections
    currentSelections[visibleNumberFieldsSlug] = currentSelection
  })

  // 5. check which filters in currentSelections are active ones
  // currentSelections returns either a selection or the defaults (min, max)
  // this leaves us without knowledge which filter is actually active
  // we calculate this by comparing the currentSelections with the defaults
  const activeNumberFilters = visibleNumberFieldsSlugs.filter(
    (visibleNumberFieldsSlug) =>
      // we can assert it's not undefined or null because we just made the same loop above, hence !
      isNumberFilterActive(currentSelections[visibleNumberFieldsSlug], [
        filterData[visibleNumberFieldsSlug].sliderStart,
        filterData[visibleNumberFieldsSlug].sliderEnd,
      ]),
  )

  return { activeNumberFilters, currentSelections }
}
