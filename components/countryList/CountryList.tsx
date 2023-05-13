import { useState, useEffect, CSSProperties } from 'react'
import { useRouter } from 'next/router'

// hidden
import getAndValidateHiddenQuery from '../../lib/settings/getAndValidateHiddenQuery'
// region
import getParameterFromQuery from '@/lib/query/getParameterFromQuery'
import validateRegionsQuery from '../../lib/regionFilter/validateRegionsQuery'
import filterCountriesByRegion from '../../lib/regionFilter/filterCountriesByRegion'
// numbers
import getNumbersQueryData from '../../lib/numberFilter/getNumbersQueryData'
import filterCountriesByNumbers from '../../lib/numberFilter/filterCountriesByNumbers'
// sorting
import applySorting from '../../lib/sorting/applySorting'

// components
import CountryCount from '../header/CountryCount'
import Filters from '../filters/Filters'
import CountryListHeaders from './CountryListHeaders'
import CountryRow from './CountryRow'

// types
import { Country } from '@/types/country'
import { FilterDataType } from '@/types/filterData'

type Props = {
  countries: Country[]
  filterData: FilterDataType
}

function CountryList({ countries, filterData }: Props) {
  const router = useRouter()
  // since we are using SSG, the query object on the router will be empty, it needs to be hydrated first
  // https://nextjs.org/docs/advanced-features/automatic-static-optimization#how-it-works
  // but, this leads to the list of countries being default ordered first and then after hydration getting sorted
  // it's like flash from sorted default to sorted along query sorting parameter
  // we solve this by listening to router.isReady and setting state routerReady, we only render when state routerReady
  const [routerReady, setRouterReady] = useState(false)
  useEffect(() => {
    if (router.isReady) {
      setRouterReady(true)
    }
  }, [router.isReady])

  // 1. check the display options

  // we don't wait for routerReady because the headers are only displayed when routerReady
  // we need to know display fields in 3 cases
  // - to set grid
  // - to filter (we don't filter hidden fields)
  // - to pass to CountryListHeaders and countryRow

  // get and validate hidden query
  const activeHidden = getAndValidateHiddenQuery(router.query)

  // set grid styles
  const numberOfVisibleFields = 3 - activeHidden.length
  const gridTemplateColumnsStyle: CSSProperties =
    numberOfVisibleFields < 1
      ? { gridTemplateColumns: '1.5em minmax(9em, 15em)' }
      : {
          gridTemplateColumns: `1.5em minmax(9em, 15em) repeat(${numberOfVisibleFields}, minmax(auto, 9em))`,
        }

  // // 2. check the filter options

  // 2.A. apply region filters
  // check if there are active regionFilters or not
  const activeRegions = validateRegionsQuery(
    getParameterFromQuery('regions', router.query),
    filterData.regionIndexes,
  )
  // run filter by region
  const countriesFilteredByRegion = filterCountriesByRegion(
    countries,
    filterData.regionIndexes,
    activeRegions,
  )

  // 2.B. apply number filters
  // check if there are active numberFilters
  const activeNumbers = getNumbersQueryData(
    activeHidden,
    router.query,
    filterData,
  )
  const countriesFilteredByNumbers = filterCountriesByNumbers(
    countriesFilteredByRegion,
    activeNumbers.activeNumberFilters,
    activeNumbers.currentSelections,
  )

  // 3. sorting
  const {
    countries: sortedCountries,
    sortBy,
    sortAsc,
  } = applySorting(routerReady, router.query, countriesFilteredByNumbers)

  return (
    <div className='site__grid--home'>
      {!routerReady && '...loading'}
      {routerReady && (
        <>
          <CountryCount count={sortedCountries.length} />
          <Filters
            filterData={filterData}
            activeHidden={activeHidden}
            activeRegions={activeRegions}
            activeNumbers={activeNumbers}
          />
          <main className='country-list' style={gridTemplateColumnsStyle}>
            <CountryListHeaders
              activeHidden={activeHidden}
              sortBy={sortBy}
              sortAsc={sortAsc}
            />
            {sortedCountries.length === 0 && (
              <div style={{ gridColumn: '2/-1' }}>no results</div>
            )}
            {sortedCountries.map((country, i) => (
              <CountryRow
                country={country}
                index={i}
                key={country.cca3}
                activeHidden={activeHidden}
              />
            ))}
          </main>
        </>
      )}
    </div>
  )
}

export default CountryList
