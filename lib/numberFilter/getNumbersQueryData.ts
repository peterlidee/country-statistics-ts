import validateNumbersQuery from './validateNumbersQuery'
import isNumberFilterActive from './isNumberFilterActive'
import { ParsedUrlQuery } from 'querystring'
import { FilterDataType } from '@/types/filterData'
import fields from '@/components/fields/fields'
import { NumberFieldSlug } from '@/components/fields/types/fields'
import { isNumberField } from '@/components/fields/types/fieldsPredicates'

// this function returns
// - activeNumberFilters: array of string
// - currentSelections: object with all numberFilters as keys and either the current selection or defaults as values

export default function getNumberQueryData(
  hiddenFields: NumberFieldSlug[],
  routerQuery: ParsedUrlQuery,
  filterData: FilterDataType,
) {
  // 1. get NumberFieldsData
  const numberFields = fields.filter(isNumberField)

  // 2. filter our the hidden fields (we know what's hidden from hide router.query)
  const visibleNumberFields = numberFields.filter((numberField) =>
    hiddenFields.includes(numberField.slug),
  )

  // 3. get the slugs of visible NumberFields
  const visibleNumberFieldSlugs = visibleNumberFields.map((item) => item.slug)

  // 4. for each visibleNumberFieldSlug, get the value from query and validate it (or set to default)
  // mapped type definition [slug in NumberFieldSlug]
  const currentSelections: { [slug in NumberFieldSlug]: [number, number] } = {
    area: [0, 0],
    population: [0, 0],
    density: [0, 0],
  }

  visibleNumberFieldSlugs.map((visibleNumberFieldSlug) => {
    const currentSelection = validateNumbersQuery(
      routerQuery[visibleNumberFieldSlug] as string | undefined,
      [
        filterData[visibleNumberFieldSlug].sliderStart,
        filterData[visibleNumberFieldSlug].sliderEnd,
      ],
    )
    // add to currentSelections
    currentSelections[visibleNumberFieldSlug] = currentSelection
  })

  // 5. check which filters in currentSelections are active ones
  // currentSelections returns either a selection or the defaults (min, max)
  // this leaves us without knowledge which filter is actually active
  // we calculate this by comparing the currentSelections with the defaults
  const activeNumberFilters = visibleNumberFieldSlugs.filter(
    (visibleNumberFieldSlug) =>
      isNumberFilterActive(currentSelections[visibleNumberFieldSlug], [
        filterData[visibleNumberFieldSlug].sliderStart,
        filterData[visibleNumberFieldSlug].sliderEnd,
      ]),
  )

  return { activeNumberFilters, currentSelections }
}
