type FieldsDataType = {
  sortAscDefault: boolean
  sortKey: string
  legend: string
  key: string
}

export type TextFieldSlug = 'country'
export type NumberFieldSlug = 'area' | 'population' | 'density'

export type TextFieldsDataType = FieldsDataType & {
  slug: TextFieldSlug
  label: Capitalize<TextFieldSlug>
  displayToggle: false
  sortType: 'text'
}

export type NumberFieldDataType = FieldsDataType & {
  slug: NumberFieldSlug
  label: Capitalize<NumberFieldSlug>
  displayToggle: true
  sortType: 'number'
}

export type FieldsDataType = [
  TextFielsdDataType,
  NumberFieldDataType,
  NumberFieldsDataType,
  NumberFieldsDataType,
]

// type predicates
export const isNumberFieldsData = (
  fieldData: NumberFieldsDataType | TextFieldsDataType,
): fieldData is NumberFieldsDataType => fieldData.sortType === 'number'

export const isTextFieldsData = (
  fieldData: NumberFieldsDataType | TextFieldsDataType,
): fieldData is TextFieldsDataType => fieldData.sortType === 'text'
