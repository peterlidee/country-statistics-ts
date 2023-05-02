import { ParsedUrlQuery } from 'querystring'
import getParameterFromQuery from '../query/getParameterFromQuery'

export default function getRegionsQuery(routerQuery: ParsedUrlQuery) {
  return getParameterFromQuery('regions', routerQuery)
}
