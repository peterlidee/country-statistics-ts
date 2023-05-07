type Field = {
  sortAscDefault: boolean
  legend: string
}

export type TextFieldSlug = 'country'
// export type TextFieldSortKey = 'country'
export type NumberFieldSlug = 'area' | 'population' | 'density'
// export type NumberFieldSortKey = NumberFieldSlug

export type TextField = Field & {
  slug: TextFieldSlug
  label: Capitalize<TextFieldSlug>
  // sortKey: TextFieldSortKey
  displayToggle: false
  sortType: 'text'
  // key: TextFieldSortKey
}

export type NumberField = Field & {
  slug: NumberFieldSlug
  label: Capitalize<NumberFieldSlug>
  // sortKey: NumberFieldSortKey
  displayToggle: true
  sortType: 'number'
  // key: `${NumberFieldSlug}PrettyFormat`
}

export type Fields = [TextField, NumberField, NumberField, NumberField]
