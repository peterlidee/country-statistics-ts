/**
 * displays input checkboxes for each fieldsData (population, arae, density) and controls visibility (toggle)
 */

import { useRouter } from 'next/router'
import getAndValidateHiddenQuery from '../../lib/settings/getAndValidateHiddenQuery'
import fieldsData from '../fields/fieldsData'

function FieldSettings() {
  // we won't wait for router.isReady because this component is inside settingsToggle and will be collapsed on first pageload
  const router = useRouter()
  const activeHidden = getAndValidateHiddenQuery(router.query)

  // handle inputclick
  const handleChange = (fieldSlug: string): void => {
    // if the fieldSlug is in activeHidden, remove it, else add it
    const newFieldsHidden = activeHidden.includes(fieldSlug)
      ? activeHidden.filter((field) => field !== fieldSlug)
      : [...activeHidden, fieldSlug]

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

  return (
    <>
      <div className='settings__title'>display columns:</div>
      {fieldsData.map((field) => {
        if (!field.displayToggle) return null
        return (
          <div key={`fieldsetting-${field.slug}`}>
            <input
              type='checkbox'
              value={field.slug}
              checked={!activeHidden.includes(field.slug)}
              onChange={() => handleChange(field.slug)}
              id={`fieldsetting-${field.slug}`}
              className='settings__checkbox'
            />
            <label htmlFor={`fieldsetting-${field.slug}`}>{field.label}</label>
          </div>
        )
      })}
    </>
  )
}

export default FieldSettings
