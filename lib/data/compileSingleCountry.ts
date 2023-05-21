/**
 * cleans up rawCountry into structured singleCountry
 * @param rawCountry - a parsed json fetch object
 * @returns SingleCountryType
 */

import { SingleCountryType } from '@/types/singleCountry'

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

export function compileSingleCountry(rawCountry: any): SingleCountryType {
  const borders: string[] = rawCountry?.borders || []
  const flag: string = rawCountry?.flags?.svg || rawCountry?.flags?.png || ''
  const coatOfArms: string =
    rawCountry?.coatOfArms?.svg || rawCountry?.coatOfArms?.png || ''
  const capital: string =
    rawCountry?.capital && Array.isArray(rawCountry.capital)
      ? rawCountry.capital[0]
      : ''
  return {
    countryName: rawCountry?.name?.common || '',
    tld: rawCountry?.tld?.[0] || '',
    cca2: extractStringValueFromProp(rawCountry, 'cca2'),
    cca3: extractStringValueFromProp(rawCountry, 'cca3'),
    capital,
    region: extractStringValueFromProp(rawCountry, 'region'),
    subregion: extractStringValueFromProp(rawCountry, 'subregion'),
    borders,
    area: extractNumberValueFromProp(rawCountry, 'area'),
    population: extractNumberValueFromProp(rawCountry, 'population'),
    flag,
    coatOfArms,
  }
}
