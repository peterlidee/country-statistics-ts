import { NumberField, TextField } from '@/types/fields'
import Wrapper from '../general/Wrapper'

import PropTypes from 'prop-types'
import { fieldPropTypes } from '@/propTypes/fieldPropTypes'

type Props = {
  field: NumberField | TextField
}

// displays legend string or an empty string of countryListHeader
function CountryListLegend({ field }: Props) {
  return (
    <Wrapper base={'country-list-legend'} modifier={field.slug}>
      {field.legend || <>&nbsp;</>}
    </Wrapper>
  )
}

CountryListLegend.propTypes = {
  field: fieldPropTypes.isRequired,
}

export default CountryListLegend
