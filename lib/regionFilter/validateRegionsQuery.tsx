/**
 * check if @values are all valid (sub)regions?
 * returns array with only valid values or []
 * @param values: string[]
 * @param regionIndexes: filterData.regionIndexes
 * @returns string[]
 */

import { FilterDataType } from '@/types/filterData'

export default function validateRegionsQuery(
  values: string[],
  regionIndexes: FilterDataType['regionIndexes'],
): string[] {
  if (values.length === 0) return values
  return values.filter((value) => regionIndexes.hasOwnProperty(value))
}
