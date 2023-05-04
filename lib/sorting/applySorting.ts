import { ParsedUrlQuery } from 'querystring'
import fieldsData from '../../components/fields/fieldsData'
import sortCountries from './sortCountries'
import { Country } from '@/types/country'
import {
  NumberFieldDataType,
  NumberFieldSortKey,
  TextFieldDataType,
  TextFieldSortKey,
} from '@/types/fieldsData'

// do some calculations and then sort
// returns sortBy, sortAsc and sortedCountries

// TODO: use getParameters from query and remove sortKey from fieldsData, use slug instead
// rework Country into country.country instead of countryName

export default function applySorting(
  routerReady: Boolean,
  query: ParsedUrlQuery,
  countries: Country[],
) {
  // init default sortAsc, sortBy and currFieldIndex
  let sortBy = fieldsData[0].slug as string
  let sortAsc = fieldsData[0].sortAscDefault
  // default field to sortBy
  let currFieldIndex = 0

  // when router not ready, return original countries
  if (!routerReady) return { countries, sortBy, sortAsc }

  // find the sort value passed in query, and if it's valid,
  // use it to set sortBy, sortAsc and calculate currFieldIndex
  if (
    query.hasOwnProperty('sort') &&
    query.sort !== '' &&
    typeof query.sort === 'string'
  ) {
    const sortQuery = query.sort
    // set sortAsc
    sortAsc = !sortQuery.startsWith('-')
    // get the param out of the query
    const passedSortBy = sortAsc ? sortQuery : sortQuery.slice(1)
    // is the param valid? we check it against fieldsData
    currFieldIndex = fieldsData.findIndex(
      (field: NumberFieldDataType | TextFieldDataType) =>
        field.sortKey === passedSortBy,
    )
    // if passedSortBy is valid, it was found in fieldsData and index > -1
    // else we pass 0 for the default sort
    if (currFieldIndex > -1) {
      sortBy = passedSortBy
    } else {
      // reset the currFieldIndex to 0 (the default country field)
      currFieldIndex = 0
      // reset sortAsc to default (query might have been '-foobar')
      sortAsc = fieldsData[0].sortAscDefault
    }
  }

  // sort the countries
  const sortedCountries = sortCountries(
    [...countries],
    // since we used
    fieldsData[currFieldIndex].sortKey,
    sortAsc,
  )

  return { countries: sortedCountries, sortBy, sortAsc }
}
