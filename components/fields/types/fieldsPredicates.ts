// type predicates

import {
  NumberField,
  NumberFieldSlug,
  // NumberFieldSortKey,
  TextField,
  TextFieldSlug,
  // TextFieldSortKey,
} from './fields'

// check if field is NumberField
export const isNumberField = (
  fieldData: NumberField | TextField,
): fieldData is NumberField => fieldData.sortType === 'number'

// check if field is TextField
export const isTextField = (
  fieldData: NumberField | TextField,
): fieldData is TextField => fieldData.sortType === 'text'

// check if slug is NumberFieldSlug
export const isNumberFieldSlug = (slug: string): slug is NumberFieldSlug => {
  const numberSlugs: NumberFieldSlug[] = ['area', 'density', 'population']
  const numberSlugStrings = numberSlugs.map((slug) => slug) as string[]
  return numberSlugStrings.includes(slug)
}

// check if slug is TextFieldSlug
export const isTextFieldSlug = (slug: string): slug is TextFieldSlug => {
  const textSlug: TextFieldSlug = 'country'
  const textSlugString = textSlug as string
  return textSlugString === slug
}

// check if slug is NumberFieldSlug | TextFieldSlug
export const isFieldSlug = (slug: string) => {
  return isNumberFieldSlug(slug) || isTextFieldSlug(slug)
}

// check if sortKey is NumberFieldSortKey or not
// export function isNumberFieldSortKey(
//   sortKey: NumberFieldSortKey | TextFieldSortKey,
// ): sortKey is NumberFieldSortKey {
//   const textFieldSortKey: TextFieldSortKey = 'country'
//   const textFieldSortKeyString = textFieldSortKey as string
//   return sortKey !== textFieldSortKeyString
// }
