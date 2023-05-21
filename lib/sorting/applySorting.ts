import { ParsedUrlQuery } from 'querystring'
import sortCountries from './sortCountries'
import { Country } from '@/types/country'
import fields from '@/components/fields/fields'
import { NumberFieldSlug, TextFieldSlug } from '@/types/fields'
import getParameterFromQuery from '../query/getParameterFromQuery'
import validateSortQuery from './validateSortQuery'

export type ValidSortData = {
  sortBy: TextFieldSlug | NumberFieldSlug
  sortAsc: boolean
}

const defaultSortData: ValidSortData = {
  sortBy: fields[0].slug,
  sortAsc: fields[0].sortAscDefault,
}

/**
 * get ValidSortData and sort countries
 * @param routerReady boolean state value
 * @param query - router.query
 * @param countries - Country[]
 * @returns sorted Country[] and ValidSortData (sortAsc and sortBy)
 */

export default function applySorting(
  routerReady: Boolean,
  query: ParsedUrlQuery,
  countries: Country[],
) {
  // when router not ready, return original countries
  if (!routerReady) return { countries, ...defaultSortData }

  // get the sort value from query (returns [])
  const queryValues = getParameterFromQuery('sort', query)
  // validate the sort value from query
  const { sortBy, sortAsc } = validateSortQuery(queryValues, defaultSortData)
  // sort the countries
  const sortedCountries = sortCountries([...countries], sortBy, sortAsc)

  return { countries: sortedCountries, sortBy, sortAsc }
}
