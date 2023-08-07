import NeighbourComponent from './NeighbourComponent'
import Source from '@/components/sources/Source'
import Link from 'next/link'
import { Neighbour } from '@/types/neighbour'

type Props = {
  neighboursEndpoint: string
  neighbours: Neighbour[]
}

function NeighbouringCountries({ neighboursEndpoint, neighbours }: Props) {
  // if neighbours.length === 0, it means it's an island
  // data is garanteed
  // no borders
  if (neighbours.length === 0)
    return <NeighbourComponent>None (island).</NeighbourComponent>

  // else, there are neighbours
  // construct source for this fetch
  const source = (
    <Source
      endpoint={neighboursEndpoint}
      label={'restcountries.com/{codes}'}
      loading={false}
      error={undefined}
      type='SSG'
    />
  )
  // construct the neighbours
  const allNeighbours = (
    <div className={neighbours.length > 6 ? 'neighbours-grid' : ''}>
      {neighbours.map((neighbour) => (
        <div key={`country-${neighbour.cca3}`}>
          <Link
            href={`/country/${neighbour.cca3}`}
            className='neighbour-country'
          >
            {neighbour.countryName}
          </Link>
        </div>
      ))}
    </div>
  )
  return (
    <NeighbourComponent source={source}>{allNeighbours}</NeighbourComponent>
  )
}

export default NeighbouringCountries
