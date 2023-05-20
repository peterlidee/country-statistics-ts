import React, { useState, useCallback, useRef, useEffect } from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
import MapControles from './MapControles'
import Sources from '../../sources/Sources'
import Source from '../../sources/Source'
import Placeholder from '../../svgSnippets/Placeholder'
import { SingleCountryType } from '@/types/singleCountry'
import { RegionOrSubregionCountries } from '@/types/regionOrSubregionCountries'

/**
 * load map and call it, render MapControles and Sources
 * @param singleCountry - SingleCountryType
 * @param regionCountries - all countries in region type RegionOrSubregionCountries
 * @param subregionCountries - all countries in subregion type RegionOrSubregionCountries
 * @return JSX.Element
 */

type Props = {
  singleCountry: SingleCountryType
  regionCountries: RegionOrSubregionCountries
  subregionCountries?: RegionOrSubregionCountries
}

const containerStyle = {
  width: '100%',
  height: '450px',
}

function MapWidget({
  singleCountry,
  regionCountries,
  subregionCountries,
}: Props) {
  const singleCountryName = singleCountry.countryName
  const singleCountryCode =
    singleCountry.tld === '' ? singleCountry.region : singleCountry.tld

  // connect to google maps
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_GOOGLE!,
    language: 'en',
  })

  // set state to loaded once GoogleMap onload method fired
  const [loaded, setLoaded] = useState(false)
  // we make 2 geocode request, for country and capital
  // their loading and error states are captured here
  const [geoCodeLoading, setGeoCodeLoading] = useState(true)
  const [geoCodeError, setGeoCodeError] = useState<undefined | Error>(undefined)

  const mapRef = useRef<google.maps.Map | null>(null)

  const setMap = (map: google.maps.Map, bounds: google.maps.LatLngBounds) => {
    map.fitBounds(bounds) // # auto-zoom
    map.panToBounds(bounds) // # auto-center
  }

  // this function calculates the countries boundaries and sets the map to them with error and loading state
  const setCountryOnMap = useCallback(
    (
      map: google.maps.Map,
      singleCountryName: string,
      singleCountryCode: string,
    ) => {
      setGeoCodeLoading(true)

      const geoCoder = new window.google.maps.Geocoder()
      geoCoder.geocode(
        { address: singleCountryName, region: singleCountryCode },
        function (results, status) {
          if (status == 'OK') {
            // we have a result
            // get bounds
            const bounds = new google.maps.LatLngBounds()
            const viewport = results![0].geometry.viewport
            const ne = new google.maps.LatLng(
              viewport.getNorthEast().lat(),
              viewport.getNorthEast().lng(),
            )
            const sw = new google.maps.LatLng(
              viewport.getSouthWest().lat(),
              viewport.getSouthWest().lng(),
            )
            bounds.extend(ne)
            bounds.extend(sw)
            // set map to bounds
            setMap(map, bounds)
            // set error and loading
            setGeoCodeError(undefined)
            setGeoCodeLoading(false)
          } else {
            // handle error, set error and loading
            setGeoCodeError(new Error(`No data found: ${status}`))
            setGeoCodeLoading(false)
          }
        },
      )
    },
    [], // useCallback deps
  )

  // when singleCountry updates, update the map
  useEffect(() => {
    if (loaded) {
      setCountryOnMap(mapRef.current!, singleCountryName, singleCountryCode)
    }
  }, [loaded, setCountryOnMap, singleCountryName, singleCountryCode])

  // safe map in ref and call setCountryOnMap
  const onLoad = (map: google.maps.Map) => {
    mapRef.current = map
    setLoaded(true)
    setCountryOnMap(map, singleCountryName, singleCountryCode)
  }

  //cleanup
  const onUnmount = (map: google.maps.Map) => {
    mapRef.current = null
  }

  return (
    <div className='single-country__map'>
      {(!isLoaded || loadError) && <Placeholder />}
      {isLoaded && !loadError && (
        <div className='single-country__box'>
          <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            onUnmount={onUnmount}
          />
          {loaded && (
            <MapControles
              singleCountry={singleCountry}
              map={mapRef.current!}
              setCountryOnMap={setCountryOnMap}
              setGeoCodeLoading={setGeoCodeLoading}
              setGeoCodeError={setGeoCodeError}
              regionCountries={regionCountries}
              subregionCountries={subregionCountries}
            />
          )}
        </div>
      )}
      <Sources>
        <Source label='Google Maps API' loading={!isLoaded} error={loadError} />
        <Source
          label='Google GeoCode API'
          loading={geoCodeLoading}
          error={geoCodeError}
        />
        <Source
          label='restcountries.com/{region}'
          endpoint={regionCountries.endpoint}
          loading={regionCountries.isLoading}
          error={regionCountries.error}
        />
        {subregionCountries && (
          <Source
            label='restcountries.com/{subregion}'
            endpoint={subregionCountries.endpoint}
            loading={subregionCountries.isLoading}
            error={subregionCountries.error}
          />
        )}
      </Sources>
    </div>
  )
}

export default React.memo(MapWidget)
