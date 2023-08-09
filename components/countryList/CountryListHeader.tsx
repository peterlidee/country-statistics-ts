import { useRouter } from 'next/router'
import Link from 'next/link'
import Wrapper from '../general/Wrapper'
import IconSort from '../svgSnippets/IconSort'
import {
  NumberField,
  NumberFieldSlug,
  TextField,
  TextFieldSlug,
} from '@/types/fields'

import PropTypes from 'prop-types'
import { fieldPropTypes } from '@/propTypes/fieldPropTypes'

type Props = {
  field: NumberField | TextField
  sortBy: NumberFieldSlug | TextFieldSlug
  sortAsc: boolean
}

// Renders a single title of the CountryListHeader as (sorting) links
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

CountryListHeader.propTypes = {
  field: fieldPropTypes.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortAsc: PropTypes.bool.isRequired,
}

export default CountryListHeader
