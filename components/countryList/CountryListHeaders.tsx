/**
 * displays header row with all fields for CountryLIst
 * @param props.activeHidden - list of hidden fields (NumberFieldDataType)
 * @param props.sortBy - NumberFieldSlug | TextFieldSlug
 * @param props.sortAsc - boolean
 * @returns JSX.Element (all the fields that will form a row)
 */

import fieldsData from '../fields/fieldsData'
import Wrapper from '../general/Wrapper'
import CountryListHeader from './CountryListHeader'
import CountryListLegend from './CountryListLegend'
import {
  NumberFieldDataType,
  NumberFieldSlug,
  TextFieldDataType,
} from '@/types/fieldsData'

type Props = {
  activeHidden: NumberFieldSlug[]
  sortBy: string
  sortAsc: boolean
}

function CountryListHeaders({ activeHidden, sortBy, sortAsc }: Props) {
  return (
    <>
      <Wrapper base={'country-list-header'} modifier={'index'}>
        {null}
      </Wrapper>
      {fieldsData.map((field: NumberFieldDataType | TextFieldDataType) => {
        // check if the field is to be displayed or not
        // only NumberFieldDataType can be hidden, activeHidden is of type NumberFieldSlug[]
        // so we have to type narrow in order to compare
        // activeHidden with field(NumberFieldDataType).slug(NumberFieldSlug)
        // in other words, if we don't narrow type, includes will try to compare type NumberFieldSlug from activeHidden with TextFieldSlug from fieldsData[0] (= country with slug = TextFieldSlug)
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
      {fieldsData.map((field: NumberFieldDataType | TextFieldDataType) => {
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

export default CountryListHeaders
