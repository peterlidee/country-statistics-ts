type FieldDataType = {
  sortAscDefault: boolean
  sortKey: string
  legend: string
  key: string
}

export type TextFieldSlug = 'country'
export type NumberFieldSlug = 'area' | 'population' | 'density'

export type TextFieldDataType = FieldDataType & {
  slug: TextFieldSlug
  label: Capitalize<TextFieldSlug>
  displayToggle: false
  sortType: 'text'
}

export type NumberFieldDataType = FieldDataType & {
  slug: NumberFieldSlug
  label: Capitalize<NumberFieldSlug>
  displayToggle: true
  sortType: 'number'
}

export type FieldsDataType = [
  TextFieldDataType,
  NumberFieldDataType,
  NumberFieldDataType,
  NumberFieldDataType,
]

// type predicates
export const isNumberFieldData = (
  fieldData: NumberFieldDataType | TextFieldDataType,
): fieldData is NumberFieldDataType => fieldData.sortType === 'number'

export const isTextFieldData = (
  fieldData: NumberFieldDataType | TextFieldDataType,
): fieldData is TextFieldDataType => fieldData.sortType === 'text'
