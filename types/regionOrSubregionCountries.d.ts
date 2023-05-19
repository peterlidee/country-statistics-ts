// to set a google map, we need bounds
// these can be region or subregion
// this type provides these and some extra things we need

export type CountryLatLng = { latlng: [number, number] }

export type RegionOrSubregionCountries = {
  isLoading: boolean
  error: undefined | Error
  data: CountryLatLng[]
  endpoint: string
}
