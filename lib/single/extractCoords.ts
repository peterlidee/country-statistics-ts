import { Coordinates } from '@/types/coordinates'
import isCoordinates from '@/types/coordinatesPredicate'

// receives raw data from fetch
// returns Coordinates[][]
export default function extractCoords(data: unknown) {
  const coordinates: Coordinates[] = []
  if (Array.isArray(data)) {
    data.map((country) => {
      if (
        country !== null &&
        typeof country === 'object' &&
        'latlng' in country &&
        isCoordinates(country.latlng)
      ) {
        coordinates.push([country.latlng[0], country.latlng[1]])
      }
    })
  }
  return coordinates
}
