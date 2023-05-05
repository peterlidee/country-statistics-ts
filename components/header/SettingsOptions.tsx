/**
 * displays input checkboxes for each fieldsData (population, arae, density) and controls visibility (toggle)
 * @returns list of NumberField toggles
 */

import { useRouter } from 'next/router'
import getAndValidateHiddenQuery from '../../lib/settings/getAndValidateHiddenQuery'
import fields from '../fields/fields'
import { isNumberField } from '../fields/types/fieldsPredicates'
import { NumberFieldSlug } from '../fields/types/fields'

function FieldSettings() {
  // we won't wait for router.isReady because this component is inside settingsToggle and will be collapsed on first pageload
  const router = useRouter()
  const activeHidden = getAndValidateHiddenQuery(router.query)

  // handle inputclick
  const handleChange = (numberFieldSlug: NumberFieldSlug): void => {
    // if the fieldSlug is in activeHidden, remove it, else add it
    const newFieldsHidden = activeHidden.includes(numberFieldSlug)
      ? activeHidden.filter((field) => field !== numberFieldSlug)
      : [...activeHidden, numberFieldSlug]

    // make shallow push with new hidden array
    router.push(
      {
        pathname: '/',
        query: { ...router.query, hide: newFieldsHidden.join(',') },
      },
      undefined,
      { shallow: true },
    )
  }

  // only loop over NumberFieldDataType, TextFieldDataType is not hiddable
  const numberFields = fields.filter(isNumberField)

  return (
    <>
      <div className='settings__title'>display columns:</div>
      {numberFields.map((numberField) => {
        return (
          <div key={`fieldsetting-${numberField.slug}`}>
            <input
              type='checkbox'
              value={numberField.slug}
              checked={!activeHidden.includes(numberField.slug)}
              onChange={() => handleChange(numberField.slug)}
              id={`fieldsetting-${numberField.slug}`}
              className='settings__checkbox'
            />
            <label htmlFor={`fieldsetting-${numberField.slug}`}>
              {numberField.label}
            </label>
          </div>
        )
      })}
    </>
  )
}

export default FieldSettings
