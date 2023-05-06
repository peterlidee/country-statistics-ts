import { ParsedUrlQuery } from 'querystring'
import sortCountries from './sortCountries'
import { Country } from '@/types/country'
import fields from '@/components/fields/fields'
import {
  NumberFieldSortKey,
  TextFieldSortKey,
} from '@/components/fields/types/fields'
import getParameterFromQuery from '../query/getParameterFromQuery'
import validateSortQuery from './validateSortQuery'

// TODO: use getParameters from query and remove sortKey from fields, use slug instead
// rework Country into country.country instead of countryName

export type ValidSortData = {
  sortBy: TextFieldSortKey | NumberFieldSortKey
  sortAsc: boolean
}

const defaultSortData: ValidSortData = {
  sortBy: fields[0].sortKey,
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
  if (!routerReady) return defaultSortData

  // get the sort value from query (returns [])
  const queryValues = getParameterFromQuery('sort', query)
  // validate the sort value from query
  const { sortBy, sortAsc } = validateSortQuery(queryValues, defaultSortData)
  // sort the countries
  const sortedCountries = sortCountries([...countries], sortBy, sortAsc)

  return { countries: sortedCountries, sortBy, sortAsc }
}
