type FieldDataType = {
  sortAscDefault: boolean
  legend: string
  key: string
}

export type TextFieldSlug = 'country'
export type TextFieldSortKey = 'countryName'
export type NumberFieldSlug = 'area' | 'population' | 'density'
export type NumberFieldSortKey = NumberFieldSlug

export type TextFieldDataType = FieldDataType & {
  slug: TextFieldSlug
  label: Capitalize<TextFieldSlug>
  sortKey: TextFieldSortKey
  displayToggle: false
  sortType: 'text'
}

export type NumberFieldDataType = FieldDataType & {
  slug: NumberFieldSlug
  label: Capitalize<NumberFieldSlug>
  sortKey: NumberFieldSortKey
  displayToggle: true
  sortType: 'number'
}

export type FieldsDataType = [
  TextFieldDataType,
  NumberFieldDataType,
  NumberFieldsDataType,
  NumberFieldsDataType,
]

// type predicates
export const isNumberFieldData = (
  fieldData: NumberFieldDataType | TextFieldDataType,
): fieldData is NumberFieldDataType => fieldData.sortType === 'number'

export const isTextFieldData = (
  fieldData: NumberFieldDataType | TextFieldDataType,
): fieldData is TextFieldDataType => fieldData.sortType === 'text'
