import { ParsedUrlQuery } from 'querystring'
import fieldsData from '../../components/fields/fieldsData'
import getParameterFromQuery from '../query/getParameterFromQuery'

/**
 * gets query['hide'] and validates the value against allowed options
 * @param routerQuery - router.query
 * @returns string[]
 */

export default function getAndValidateHiddenQuery(routerQuery: ParsedUrlQuery) {
  // 1. get the values from query
  const values = getParameterFromQuery('hide', routerQuery)
  // 2. get all valid filters
  const validFilters = fieldsData
    .filter((field) => field.displayToggle)
    .map((field) => field.slug)
  // 3. validate the values against validFilters
  return values.filter((value) => validFilters.includes(value))
}
