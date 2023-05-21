import { NumberFieldSlug, TextFieldSlug } from '@/types/fields'
import { isNumberFieldSlug } from '@/types/fieldsPredicates'
import { Country } from '@/types/country'

/**
 * sort countries array by (validated) sortBy in sortAsc order
 * @param countries - Country[]
 * @param sortBy - NumberFieldSlug | TextFieldSlug
 * @param sortAsc - boolean
 * @returns sorted Country[]
 */

export default function sortCountries(
  countries: Country[],
  sortBy: NumberFieldSlug | TextFieldSlug,
  sortAsc: boolean,
) {
  let sortedArr: Country[] = []

  // let ts know that we are dealing with NumberFieldSlug or TextFieldSlug
  if (isNumberFieldSlug(sortBy)) {
    sortedArr = countries.sort((a, b) => {
      if (sortAsc) return a[sortBy] - b[sortBy]
      return b[sortBy] - a[sortBy]
    })
  } else {
    sortedArr = countries.sort((a, b) => {
      // sort asc
      if (sortAsc) {
        if (a[sortBy] > b[sortBy]) return 1
        if (b[sortBy] > a[sortBy]) return -1
        return 0
      }
      // sort desc
      if (a[sortBy] < b[sortBy]) return 1
      if (b[sortBy] < a[sortBy]) return -1
      return 0
    })
  }
  return sortedArr
}
