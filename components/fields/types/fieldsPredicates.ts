// type predicates

import { NumberField, TextField } from './fields'

// check if field is NumberField
export const isNumberField = (
  fieldData: NumberField | TextField,
): fieldData is NumberField => fieldData.sortType === 'number'

// check if field is TextField
export const isTextField = (
  fieldData: NumberField | TextField,
): fieldData is TextField => fieldData.sortType === 'text'
