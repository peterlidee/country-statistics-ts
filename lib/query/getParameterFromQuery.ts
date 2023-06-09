import { ParsedUrlQuery } from 'querystring'

/**
 * check if @query has @parameter and it's value is not empty
 * @param parameter literal union
 * @param query router.query
 * @returns - string[]
 */

export default function getParameterFromQuery(
  parameter: 'hide' | 'regions' | 'sort',
  query: ParsedUrlQuery,
) {
  if (!query.hasOwnProperty(parameter) || query[parameter] === '') {
    return []
  }
  const queryString = query[parameter]
  // narrow type, we only work with string ,ParsedUrlQuery offers more options
  if (typeof queryString === 'string') return queryString.split(',')
  return []
}
