import { Country } from '@/types/country'
import { getNumberFilterData } from './getNumberFilterData'
import {
  DefaultRegionStateType,
  FilterDataType,
  RegionIndexesType,
} from '@/types/filterData'

type RegionNamesType = {
  [regionName: string]: Set<string>
}

export default function getFilterData(countries: Country[]): FilterDataType {
  // this function should only run once

  // check if there's data
  // if(!countries) return false;

  // calculate data for the regions and the subregions (TEXT filters)
  // we only loop countries once, so a lot is going on

  // we are going to do 3 things
  // 1. make an object with all subregions per region
  // {region: Set(subregion, subregion, ...)}
  const regionNames: RegionNamesType = {}
  // 2. make an object with all indexes per region and subregion
  // {region: [index, index, ...], subregion: [index, index, ...], ...}
  const regionIndexes: RegionIndexesType = {}

  // 3. get minimum and maximum values out of area, population and density
  const areaValues: number[] = []
  const populationValues: number[] = []
  const densityValues: number[] = []

  for (let i = 0; i < countries.length; i++) {
    const currRegion = countries[i].region
    const currSubregion = countries[i].subregion

    // if the currRegion is already is regionNames
    if (regionNames.hasOwnProperty(currRegion)) {
      // only if the currSubregion isn't empty
      if (currSubregion) {
        // (1) add the currSubregion to the set or subregion belonging to currRegion
        regionNames[currRegion].add(currSubregion)
      }
      // (2) add the curr items' index to the array of indexes of this region
      regionIndexes[currRegion].push(i)

      // the currRegion is not in regionNames
    } else {
      // (1)
      // make a new region prop in regionNames and initiate it with a new Set
      regionNames[currRegion] = new Set<string>()
      // only is the currSubregion isn't empty
      if (currSubregion) {
        // add the currSubregion to the set or subregion belonging to currRegion
        regionNames[currRegion].add(currSubregion)
      }
      // (2) make a new array for currRegion and add the curr items index to it
      regionIndexes[currRegion] = [i]
    }

    // now, we have to collect the indexes of the subregions
    // check if regionIndexes has currSubregion as key
    if (regionIndexes.hasOwnProperty(currSubregion)) {
      // push curr items index to currSubregion array
      regionIndexes[currSubregion].push(i)
    } else {
      // don't add subregion when value is empty
      // add it as key, set value to new array with curr items index
      if (currSubregion) regionIndexes[currSubregion] = [i]
    }

    // add value to area, pop and density values
    areaValues.push(countries[i].area)
    populationValues.push(countries[i].population)
    densityValues.push(countries[i].density)
  }

  // from regionNames, we will now make an object that will become region state
  // we will use this to render the region filter component
  // { region: { subregionNames: [string, ...]}, ...}
  let defaultRegionState: DefaultRegionStateType = {}

  Object.keys(regionNames)
    .sort()
    .map((regionName) => {
      defaultRegionState[regionName] = {
        subregionNames: [...regionNames[regionName]].sort(),
      }
    })

  // calculate data for numberfilters
  const areaData = getNumberFilterData(areaValues)
  const populationData = getNumberFilterData(populationValues)
  const densityData = getNumberFilterData(densityValues)

  return {
    defaultRegionState,
    regionIndexes,
    area: areaData,
    population: populationData,
    density: densityData,
  }
}
