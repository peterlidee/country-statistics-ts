// type predicates

import {
  NumberField,
  NumberFieldSlug,
  TextField,
  TextFieldSlug,
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
