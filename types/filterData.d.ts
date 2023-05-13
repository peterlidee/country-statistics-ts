import { NumberFieldSlug } from '@/components/fields/types/fields'

export type NumberFilterDataType = {
  sliderStart: number
  sliderEnd: number
  sliderStep: number
  countryMin: number
  countryMax: number
}

export type RegionIndexesType = {
  [regionOrSubregionNames: string]: Array<number>
}
export type DefaultRegionStateType = {
  [regionName: string]: { subregionNames: string[] }
}

export type FilterDataType = {
  defaultRegionState: DefaultRegionStateType
  regionIndexes: RegionIndexesType
  area: NumberFilterDataType
  density: NumberFilterDataType
  population: NumberFilterDataType
}

export type CurrentSelectionsType = {
  [slug in NumberFieldSlug]: [number, number]
}

export type ActiveNumbersType = {
  activeNumberFilters: NumberFieldSlug[]
  currentSelections: CurrentSelectionsType
}
