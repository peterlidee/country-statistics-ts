/**
 * filter main @countries array by region
 * returns countries in region or all countries when no filters
 * @param countries: Country[]
 * @param regionIndexes: RegionIndexesType
 * @param activeRegions: array of current active filters
 * @returns Country[]
 */

import { Country } from '@/types/country'
import { RegionIndexesType } from '@/types/filterData'

export default function filterCountriesByRegion(
  countries: Country[],
  regionIndexes: RegionIndexesType,
  activeRegions: string[],
): Country[] {
  const countriesFilteredByRegion = []
  if (activeRegions.length > 0) {
    // there are active region filters
    // get list of all the indexes for current selection
    let currIndexes: number[] = []
    for (let i = 0; i < activeRegions.length; i++) {
      const activeRegionIndexes = regionIndexes[activeRegions[i]]
      currIndexes = [...currIndexes, ...activeRegionIndexes]
    }
    // filter out doubles, f.e. if a region is active, all it's subregions will also be active
    currIndexes = [...new Set(currIndexes)]

    // construct list of all countries, based on these indexes
    for (let i = 0; i < currIndexes.length; i++) {
      countriesFilteredByRegion.push(countries[currIndexes[i]])
    }
    return countriesFilteredByRegion
  } else {
    // no filters, just return original array
    return countries
  }
}
