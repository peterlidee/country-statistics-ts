import React, { useEffect, useState } from 'react'
import MapCapitalButton from './MapCapitalButton'
import MapRegionButton from './MapRegionButton'
import IconPan from '../../svgSnippets/IconPan'
import { SingleCountryType } from '@/types/singleCountry'
import { RegionOrSubregionCountries } from '@/types/regionOrSubregionCountries'

export type Active = 'country' | 'capital' | 'region' | 'subregion'
type Props = {
  singleCountry: SingleCountryType
  map: google.maps.Map
  setCountryOnMap: (
    map: google.maps.Map,
    singleCountryName: string,
    singleCountryCode: string,
  ) => void
  setGeoCodeLoading: React.Dispatch<React.SetStateAction<boolean>>
  setGeoCodeError: React.Dispatch<React.SetStateAction<Error | undefined>>
  regionCountries: RegionOrSubregionCountries
  subregionCountries: RegionOrSubregionCountries | undefined
}

function MapControles({
  singleCountry,
  map,
  setCountryOnMap,
  setGeoCodeLoading,
  setGeoCodeError,
  regionCountries,
  subregionCountries,
}: Props) {
  // controles which state is active
  const [active, setActive] = useState<Active>('country')

  // reset state active to 'country' if countryName changes
  useEffect(() => {
    setActive('country')
  }, [singleCountry.countryName])

  return (
    <div className='map-controles'>
      <span className='map-controles__label'>pan to</span>
      {singleCountry.capital !== '' && (
        <MapCapitalButton
          singleCountry={singleCountry}
          map={map}
          active={active}
          setActive={setActive}
          setGeoCodeLoading={setGeoCodeLoading}
          setGeoCodeError={setGeoCodeError}
        />
      )}
      <div className='map-controles__button-container'>
        <IconPan active={active == 'country'} />
        <button
          className='map-controles__button'
          onClick={() => {
            setActive('country')
            setCountryOnMap(
              map,
              singleCountry.countryName,
              singleCountry.tld === ''
                ? singleCountry.region
                : singleCountry.tld,
            )
          }}
        >
          {singleCountry.countryName}
        </button>
      </div>
      {singleCountry.subregion && (
        <MapRegionButton
          type='subregion'
          label={singleCountry.subregion}
          map={map}
          active={active}
          setActive={setActive}
          countries={subregionCountries!}
        />
      )}
      {singleCountry.region && (
        <MapRegionButton
          type='region'
          label={singleCountry.region}
          map={map}
          active={active}
          setActive={setActive}
          countries={regionCountries}
        />
      )}
    </div>
  )
}

export default MapControles
