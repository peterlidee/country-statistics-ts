/**
 * Renders the titles of the CountryListHeader as (sorting) links
 * @param props.field - a fieldsData field
 * @param props.sortBy - NumberFieldSlug | TextFieldSlug
 * @param props.sortAsc - boolean sort ascending or not
 * @returns JSX.Element
 */

import { useRouter } from 'next/router'
import Link from 'next/link'
import Wrapper from '../general/Wrapper'
import IconSort from '../svgSnippets/IconSort'
import {
  NumberField,
  NumberFieldSlug,
  TextField,
  TextFieldSlug,
} from '../fields/types/fields'

type Props = {
  field: NumberField | TextField
  sortBy: NumberFieldSlug | TextFieldSlug
  sortAsc: boolean
}

// a single header field for countries list
function CountryListHeader({ field, sortBy, sortAsc }: Props) {
  const router = useRouter()

  // construct the link query
  // if current field is the active field, use reverse props.sortAsc
  // if current field is NOT the active field, use the defaults
  const sortActive = sortBy.includes(field.slug)
  const sortParameter = sortActive
    ? `${sortAsc ? '' : '-'}${field.slug}`
    : `${field.sortAscDefault ? '-' : ''}${field.slug}`

  return (
    <Wrapper base={'country-list-header'} modifier={field.slug}>
      <Link
        key={field.slug}
        href={{
          pathname: '/',
          query: { ...router.query, sort: sortParameter },
        }}
        shallow
        className={`link__sort link__sort--${field.slug}`}
      >
        {<IconSort sortActive={sortActive} sortAsc={sortAsc} />}
        {field.label}
      </Link>
    </Wrapper>
  )
}

export default CountryListHeader
