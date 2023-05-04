// sort an array
// key to sort by
// by text or number
// asc or desc

import { Country } from '@/types/country'
import { NumberFieldSortKey, TextFieldSortKey } from '@/types/fieldsData'

// type predicate
// if we sort numbers, we use (number - number)
// it won't work with strings
// so we need to let typescript know that we are dealing with NumberFieldSortKey
function isNumberFieldSortKey(
  sortKey: NumberFieldSortKey | TextFieldSortKey,
): sortKey is NumberFieldSortKey {
  return sortKey !== 'countryName'
}

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
