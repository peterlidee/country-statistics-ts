import { Country } from '@/types/country'
import formatNumber from '../helpers/formatNumber'
import roundNumber from '../helpers/roundNumber'

// this function compiles the data from the raw data
// [A] it copies all required data to (simpler) props
// [B] it add some extra data
// [A] copy required data to simpler props
// [B] takes arr of object, for each object add properties: 1,2,3
// 1. density and densityPrettyFormat if area && population
// 2. areaPrettyFormat if area
// 3. populationPrettyFormat if population
// 4. country added as extra field (makes it easier to sort)
// 5. replace some faulty data

export default function compileData(arr: any): Country[] {
  // console.log('addExtraData called',)

  return arr.map((item: any) => {
    // purely copy some props
    const itemCopy: Country = {
      country: item?.name?.common || '',
      cca3: item.cca3,
      region: item.region,
      subregion: item.subregion,
      area: 0,
      areaPrettyFormat: '0',
      population: 0,
      populationPrettyFormat: '0',
      density: 0,
      densityPrettyFormat: '0',
    }

    // area
    if (item.hasOwnProperty('area')) {
      // add area
      itemCopy.area = roundNumber(item.area)
      // add areaPrettyFormat
      itemCopy.areaPrettyFormat = formatNumber(itemCopy.area)
    }

    // population
    if (item.hasOwnProperty('population')) {
      // add population
      itemCopy.population = roundNumber(item.population)
      // add populationPrettyFormat
      itemCopy.populationPrettyFormat = formatNumber(itemCopy.population)
    }

    // density
    if (item.hasOwnProperty('area') && item.hasOwnProperty('population')) {
      // add population density
      itemCopy.density = roundNumber(item.population / item.area)
      // add population densityToDisplay
      itemCopy.densityPrettyFormat = formatNumber(itemCopy.density)
    }

    // 5. faulty data
    // Åland Islands get sorted incorrrectly!! so flip Å with A
    if (itemCopy.cca3 == 'ALA') {
      itemCopy.country = 'Aland Islands'
    }
    return itemCopy
  })
}
