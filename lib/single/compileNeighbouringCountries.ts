import { Neighbour } from '../../types/neighbour'

/**
 * compile raw data into { name, cca3 }[]: Neightbour[]
 * @param data - raw data from fetch
 * @returns Neigbour[]
 */

export default function compileNeighbouringCountries(
  data: unknown[],
): Neighbour[] {
  const results = data.map((country) => {
    const currCountry: Neighbour = {
      countryName: '',
      cca3: '',
    }
    // first validate country as object
    if (country !== null && typeof country === 'object') {
      // check for name and name.common
      if (
        'name' in country &&
        country.name !== null &&
        typeof country.name === 'object' &&
        'common' in country.name
      ) {
        currCountry.countryName = country.name.common as string
      }
      // check for cca3
      if ('cca3' in country) {
        currCountry.cca3 = country.cca3 as string
      }
    }
    return currCountry
  })

  // filter out countries with no data
  return results.filter(
    (result) => !(result.cca3 == '' || result.countryName == ''),
  )
}
