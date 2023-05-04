/**
 * displays legend string or an empty string of countryListHeader
 * @param props.field - fieldsData field
 */

import Wrapper from '../general/Wrapper'
import { NumberFieldDataType, TextFieldDataType } from '@/types/fieldsData'

type Props = {
  field: NumberFieldDataType | TextFieldDataType
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
