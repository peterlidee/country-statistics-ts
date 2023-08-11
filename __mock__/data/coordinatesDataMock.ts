import { CoordinatesData } from '@/types/coordinates'

const coordinatesDataMock: CoordinatesData = {
  region: {
    coordinates: [
      [1, 2],
      [3, 4],
    ],
    endpoint: 'regionEndpoint',
  },
  subregion: {
    coordinates: [
      [5, 6],
      [7, 8],
    ],
    endpoint: 'subregionEndpoint',
  },
}

export { coordinatesDataMock }
