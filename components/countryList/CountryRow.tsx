import Link from 'next/link'
import Wrapper from '../general/Wrapper'
import fields from '../fields/fields'
import { NumberFieldSlug } from '@/types/fields'
import { Country } from '@/types/country'
import { isNumberField } from '@/types/fieldsPredicates'

import PropTypes from 'prop-types'
import { countryPropTypes } from '@/propTypes/countryPropTypes'

type Props = {
  country: Country
  index: number
  activeHidden: NumberFieldSlug[]
}

// displays body row with all fields for CountryList
function CountryRow({ country, index, activeHidden }: Props) {
  // retrieve numberFieldsData so TS knows what keys are allowed
  // country[numberFieldsData[number].key] will fill on NumberFieldData | TextFieldData
  const numberFields = fields.filter(isNumberField)

  return (
    <>
      <Wrapper base={'country-cell'} modifier='index'>
        {index + 1}
      </Wrapper>
      <Wrapper base={'country-cell'} modifier={fields[0].slug}>
        <Link href={`/country/${country.cca3}`}>{country[fields[0].slug]}</Link>
      </Wrapper>
      {numberFields.map((numberField) => {
        return (
          !activeHidden.includes(numberField.slug) && (
            <Wrapper
              key={numberField.slug}
              base={'country-cell'}
              modifier={numberField.slug}
            >
              {country[`${numberField.slug}PrettyFormat`]}
            </Wrapper>
          )
        )
      })}
    </>
  )
}

CountryRow.propTypes = {
  country: countryPropTypes.isRequired,
  index: PropTypes.number.isRequired,
  activeHidden: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default CountryRow
