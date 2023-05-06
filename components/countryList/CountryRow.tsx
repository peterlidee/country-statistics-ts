/**
 * displays body row with all fields for CountryList
 * @param props.country - Country, a single country object
 * @param props.index - loop index
 * @param props.activeHidden - NumberFieldSlug[], hidden fields
 * @returns JSX.Element: a full row of non hidden country fields
 */

import Link from 'next/link'
import Wrapper from '../general/Wrapper'
import { Country } from '@/types/country'
import { NumberFieldSlug } from '../fields/types/fields'
import fields from '../fields/fields'
import { isNumberField } from '../fields/types/fieldsPredicates'

type Props = {
  country: Country
  index: number
  activeHidden: NumberFieldSlug[]
}

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
        <Link href={`/country/${country.cca3}`}>{country[fields[0].key]}</Link>
      </Wrapper>
      {numberFields.map((numberField) => {
        return (
          !activeHidden.includes(numberField.slug) && (
            <Wrapper
              key={numberField.slug}
              base={'country-cell'}
              modifier={numberField.slug}
            >
              {country[numberField.key]}
            </Wrapper>
          )
        )
      })}
    </>
  )
}

export default CountryRow
