import getParameterFromQuery from '../query/getParameterFromQuery'
import fieldsData from '@/components/fields/fieldsData'
import { ParsedUrlQuery } from 'querystring'
import { NumberFieldSlug, isNumberFieldData } from '@/types/fieldData'

/**
 * gets query['hide'] and validates the value against allowed options
 * @param routerQuery - router.query
 * @returns NumberFieldSlug[]
 */

export default function getAndValidateHiddenQuery(
  routerQuery: ParsedUrlQuery,
): NumberFieldSlug[] {
  // 1. get the values from query
  const values = getParameterFromQuery('hide', routerQuery)

  // 2. get all numberFieldData from FieldData
  // we don't assert type but use a type predicate
  // https://www.skovy.dev/blog/typescript-filter-array-with-type-guard?seed=q26nzp

  // assertion
  // const numberFieldData: NumberFieldDataType[] = fieldsData.filter(
  //   (field) => field.displayToggle,
  // ) as NumberFieldDataType[]

  // predicate
  // this will infer numberFieldData as NumberFieldDataType
  const numberFieldData = fieldsData.filter(isNumberFieldData)

  // 3. get the slugs from numberFieldData
  // we will match these against the values from query
  const validNumberSlugs = numberFieldData.map(
    (numberField) => numberField.slug,
  )

  // 4. validate the values against validFilters
  // you can't compare type string with type NumberFieldSlug using .includes
  // so we first assert validNumberSlugs as string (we know those are string so np)
  // then we can compare values and validNumberSlugs with .includes
  // but, we assert the return array from filter to be NumberFieldSlug[] (we just compared them so np)
  // and we end up with an array of values with type NumberFieldSlug
  return values.filter((value) =>
    (validNumberSlugs as string[]).includes(value),
  ) as NumberFieldSlug[]
}
