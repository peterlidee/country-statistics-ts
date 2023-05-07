import {
  isNumberFieldSlug,
  isTextFieldSlug,
} from '@/components/fields/types/fieldsPredicates'
import { ValidSortData } from './applySorting'
// import fields from '@/components/fields/fields'

/**
 * validates if values[0] is of type NumberFieldSlug or TextFieldSlug
 * returns sortBy (type fieldSlug) and sortAsc (boolean)
 * @param values - string[], non empty query.sort string
 * @param defaultSortData - { sortBy: default, sortAsc: default }
 * @returns either @defaultSortData when not valid or a valid { sortBy (TextFieldSlug | NumberFieldSlug), sortAsc }
 */

function validateSortQuery(
  values: string[],
  defaultSortData: ValidSortData,
): ValidSortData {
  // no need to validate when no values
  if (values.length === 0) return defaultSortData

  // check if there is a '-' in front of the value
  const valueIsNegated = values[0].startsWith('-')
  // we are only ever interested in the first value (sorting only works on 1 field at a time)
  const strippedValue = valueIsNegated ? values[0].slice(1) : values[0]

  if (isNumberFieldSlug(strippedValue) || isTextFieldSlug(strippedValue)) {
    // value is valid
    // strippedValue becomes type NumberFieldSlug | TextFieldSlug
    // console.log(strippedValue)

    // but, we need the sortKey, not the slug, so, we look it up
    // TODO: remove
    // const currField = fields.filter((field) => field.slug === strippedValue)

    const sortValueData: ValidSortData = {
      // sortBy: currField[0].slug,
      sortBy: strippedValue,
      sortAsc: valueIsNegated,
    }
    return sortValueData
  } else {
    // value is not of type NumberFieldSlug or TextFieldSlug and hence is not valid
    return defaultSortData
  }
}

export default validateSortQuery
