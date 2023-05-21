/**
 * displays legend string or an empty string of countryListHeader
 * @param props.field - fieldsData field
 */

import { NumberField, TextField } from '@/types/fields'
import Wrapper from '../general/Wrapper'

type Props = {
  field: NumberField | TextField
}

// a single legend field for countries list
function CountryListLegend({ field }: Props) {
  return (
    <Wrapper base={'country-list-legend'} modifier={field.slug}>
      {field.legend || <>&nbsp;</>}
    </Wrapper>
  )
}

export default CountryListLegend
