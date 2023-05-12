import { NumberFieldSlug } from '@/components/fields/types/fields'
import { Country } from '@/types/country'
import { CurrentSelectionsType } from '@/types/filterData'

/**
 * filter Country[] by numberfilters
 * @param countries - list of countries
 * @param activeNumberFilters - slugs of active filters
 * @param selections - selection or default per numberfilter
 * @returns filtered list of Country[]
 */

function filterCountriesByNumbers(
  countries: Country[],
  activeNumberFilters: NumberFieldSlug[],
  selections: CurrentSelectionsType,
) {
  // don't calculate anything if there are no filters
  if (activeNumberFilters.length == 0) return countries

  // what selection to use
  // const selection = {
  //   area: areaSelection,
  //   population: populationSelection,
  //   density: densitySelection,
  // }

  // we need to evaluate country against activeNumberFilters
  const filterFunction = (country: Country) => {
    const valid = []
    for (let i = 0; i < activeNumberFilters.length; i++) {
      // is the country[props] larger then the min selection
      const conditionBigger =
        country[activeNumberFilters[i]] >= selections[activeNumberFilters[i]][0]
      // is the county[props] smaller then the max selection
      const conditionSmaller =
        country[activeNumberFilters[i]] <= selections[activeNumberFilters[i]][1]
      // push bool to valid
      valid.push(conditionBigger && conditionSmaller)
    }
    // when all conditions are met
    return valid.every((item) => item)
  }
  // return the filtered countries array
  return countries.filter(filterFunction)
}

export default filterCountriesByNumbers
