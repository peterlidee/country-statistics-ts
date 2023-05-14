/**
 * cleans up rawCountry into structured singleCountry
 * @param rawCountry - a prased json fetch object
 * @returns type SingleCountry
 */

import { SingleCountry } from '@/types/singleCountry'

export function extractStringValueFromProp(
  obj: { [key: string]: string },
  prop: string,
) {
  return obj?.[prop] ?? ''
}

export function extractNumberValueFromProp(
  obj: { [key: string]: number },
  prop: string,
) {
  return obj?.[prop] ?? 0
}

export function compileSingleCountry(rawCountry: any): SingleCountry {
  const borders: string[] = rawCountry?.borders || []
  const flag: string = rawCountry?.flags?.svg || rawCountry?.flags?.png || ''
  const coatOfArms: string =
    rawCountry?.coatOfArms?.svg || rawCountry?.coatOfArms?.png || ''
  return {
    countryName: rawCountry?.name?.common || '',
    cca3: extractStringValueFromProp(rawCountry, 'cca3'),
    capital: extractStringValueFromProp(rawCountry, 'capital'),
    region: extractStringValueFromProp(rawCountry, 'region'),
    subregion: extractStringValueFromProp(rawCountry, 'subregion'),
    borders,
    area: extractNumberValueFromProp(rawCountry, 'area'),
    population: extractNumberValueFromProp(rawCountry, 'population'),
    flag,
    coatOfArms,
  }
}
