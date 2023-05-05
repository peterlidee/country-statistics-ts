// type predicates

import { NumberField, TextField } from './fieldsData'

// check if field is NumberFieldDataType
export const isNumberFieldData = (
  fieldData: NumberField | TextField,
): fieldData is NumberField => fieldData.sortType === 'number'

// check if field is TextFieldDataType
export const isTextFieldData = (
  fieldData: NumberField | TextField,
): fieldData is TextField => fieldData.sortType === 'text'
