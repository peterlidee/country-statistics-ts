import fields from '../fields/fields'
import {
  NumberField,
  NumberFieldSlug,
  TextField,
  TextFieldSlug,
} from '@/types/fields'
import Wrapper from '../general/Wrapper'
import CountryListHeader from './CountryListHeader'
import CountryListLegend from './CountryListLegend'

import PropTypes from 'prop-types'

type Props = {
  activeHidden: NumberFieldSlug[]
  sortBy: NumberFieldSlug | TextFieldSlug
  sortAsc: boolean
}

// displays header row with all (non hidden) fields for CountryList
function CountryListHeaders({ activeHidden, sortBy, sortAsc }: Props) {
  return (
    <>
      <Wrapper base={'country-list-header'} modifier={'index'}>
        {null}
      </Wrapper>
      {fields.map((field: NumberField | TextField) => {
        // check if the field is to be displayed or not
        // only NumberFieldDataType can be hidden, activeHidden is of type NumberFieldSlug[]
        // so we have to type narrow in order to compare activeHidden with field(NumberField).slug(NumberFieldSlug)
        // in other words, if we don't narrow type, includes will try to compare type NumberFieldSlug from activeHidden with TextFieldSlug from fields[0] (= country with slug = TextFieldSlug)
        if (field.slug !== 'country' && activeHidden.includes(field.slug))
          return null
        return (
          <CountryListHeader
            key={field.slug}
            field={field}
            sortBy={sortBy}
            sortAsc={sortAsc}
          />
        )
      })}
      <Wrapper base={'country-list-legend'} modifier={'index'}>
        {null}
      </Wrapper>
      {fields.map((field: NumberField | TextField) => {
        // check if the field legend is to be displayed or not
        // again type narrow to avoid comparing TextFieldSlug with NumberFieldSlug
        if (field.slug !== 'country' && activeHidden.includes(field.slug))
          return null
        return (
          <CountryListLegend
            field={field}
            key={`country-list-legend-${field.slug}`}
          />
        )
      })}
    </>
  )
}

CountryListHeaders.propTypes = {
  activeHidden: PropTypes.arrayOf(PropTypes.string).isRequired,
  sortBy: PropTypes.string.isRequired,
  sortAsc: PropTypes.bool.isRequired,
}

export default CountryListHeaders
