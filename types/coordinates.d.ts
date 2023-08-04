export type Coordinates = [number, number]
export type RegionCoordinates = {
  coordinates: Coordinates[]
  endpoint: string
}
export type CoordinatesData = {
  region: RegionCoordinates
  subregion: RegionCoordinates
}
