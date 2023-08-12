/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from 'react'
import SingleCountryComponent from '../SingleCountryComponent'
import Placeholder from '../../svgSnippets/Placeholder'

import PropTypes from 'prop-types'

type Props = {
  countryName: string
  flag: string
  coatOfArms: string
}

// toggle between flag and coatOfArms
function SingleCountryFlags({ countryName, flag, coatOfArms }: Props) {
  const [active, setActive] = useState('flag')
  useEffect(() => {
    setActive('flag')
    return () => setActive('flag')
  }, [countryName])

  if (flag === '') {
    return (
      <SingleCountryComponent extraClass='placeholder'>
        <Placeholder />
      </SingleCountryComponent>
    )
  }

  return (
    <SingleCountryComponent extraClass='flags'>
      {active == 'flag' && (
        <img
          src={flag}
          alt={`flag of ${countryName}`}
          className='single-country__flag'
        />
      )}
      {active == 'coatOfArms' && coatOfArms !== '' && (
        <img
          src={coatOfArms}
          alt={`coat of arms of ${countryName}`}
          className='single-country__coatOfArms'
        />
      )}
      {active == 'coatOfArms' && coatOfArms === '' && (
        // if cOA is active but there is no coa, show the flag instead
        <img
          src={flag}
          alt={`flag of ${countryName}`}
          className='single-country__flag'
        />
      )}

      {coatOfArms !== '' && (
        <div className='flags__controles'>
          <button
            className={`flags__controle ${
              active == 'flag' ? 'flags__controle--active' : ''
            }`}
            onClick={() => setActive('flag')}
          >
            flag
          </button>
          <button
            className={`flags__controle ${
              active == 'coatOfArms' ? 'flags__controle--active' : ''
            }`}
            onClick={() => setActive('coatOfArms')}
          >
            coat of arms
          </button>
        </div>
      )}
    </SingleCountryComponent>
  )
}

SingleCountryFlags.propTypes = {
  countryName: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
  coatOfArms: PropTypes.string.isRequired,
}

export default SingleCountryFlags
