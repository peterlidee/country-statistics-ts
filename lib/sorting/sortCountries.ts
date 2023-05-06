import {
  NumberFieldSortKey,
  TextFieldSortKey,
} from '@/components/fields/types/fields'
import { isNumberFieldSortKey } from '@/components/fields/types/fieldsPredicates'
import { Country } from '@/types/country'

/**
 * sort countries array by sortKey in sortAsc order
 * @param countries - Country[]
 * @param sortKey - NumberFieldSortKey | TextFieldSortKey
 * @param sortAsc - boolean
 * @returns sorted Country[]
 */

export default function sortCountries(
  countries: Country[],
  sortKey: NumberFieldSortKey | TextFieldSortKey,
  sortAsc: boolean,
) {
  let sortedArr: Country[] = []

  // let ts know that we are dealing with NumberFieldSortKey or TextFieldSortKey
  if (isNumberFieldSortKey(sortKey)) {
    sortedArr = countries.sort((a, b) => {
      if (sortAsc) return a[sortKey] - b[sortKey]
      return b[sortKey] - a[sortKey]
    })
  } else {
    sortedArr = countries.sort((a, b) => {
      // sort asc
      if (sortAsc) {
        if (a[sortKey] > b[sortKey]) return 1
        if (b[sortKey] > a[sortKey]) return -1
        return 0
      }
      // sort desc
      if (a[sortKey] < b[sortKey]) return 1
      if (b[sortKey] < a[sortKey]) return -1
      return 0
    })
  }
  return sortedArr
}
