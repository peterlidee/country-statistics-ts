type Field = {
  sortAscDefault: boolean
  legend: string
}

export type TextFieldSlug = 'country'
export type NumberFieldSlug = 'area' | 'population' | 'density'

export type TextField = Field & {
  slug: TextFieldSlug
  label: Capitalize<TextFieldSlug>
  displayToggle: false
  sortType: 'text'
}

export type NumberField = Field & {
  slug: NumberFieldSlug
  label: Capitalize<NumberFieldSlug>
  displayToggle: true
  sortType: 'number'
}

export type Fields = [TextField, NumberField, NumberField, NumberField]
