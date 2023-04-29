import { ParsedUrlQuery } from 'querystring'

/**
 * check if @query has @param and it's value is not empty
 * @param parameter literal union
 * @param query router.query
 * @returns - [] or string[]
 */

export default function getParameterFromQuery(
  parameter: 'hide',
  query: ParsedUrlQuery,
): string[] {
  if (!query.hasOwnProperty(parameter) || query[parameter] === '') {
    return []
  }
  const queryString = query[parameter] as string
  return queryString.split(',')
}
