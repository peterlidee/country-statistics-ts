import { Coordinates } from './coordinates'

export default function isCoordinates(latlng: unknown): latlng is Coordinates {
  return (
    Boolean(latlng) &&
    Array.isArray(latlng) &&
    latlng.length === 2 &&
    typeof latlng[0] === 'number' &&
    typeof latlng[1] === 'number'
  )
}
