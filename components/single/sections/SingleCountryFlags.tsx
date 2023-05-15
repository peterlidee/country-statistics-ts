/* eslint-disable @next/next/no-img-element */
import { useState } from 'react'
import BoxWrapper from '../../general/BoxWrapper'
import Placeholder from '../../svgSnippets/Placeholder'

type Props = {
  countryName: string
  flag: string
  coatOfArms: string
}

/**
 * toggle between flag and coatOfArms
 * @param props.countryName
 * @param props.flag
 * @param props.coatOfArms
 * @returns
 */

function SingleCountryFlags({ countryName, flag, coatOfArms }: Props) {
  const [active, setActive] = useState('flag')

  if (flag === '') {
    return (
      <BoxWrapper name='placeholder'>
        <Placeholder />
      </BoxWrapper>
    )
  }

  return (
    <BoxWrapper name='flags'>
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
    </BoxWrapper>
  )
}

export default SingleCountryFlags
