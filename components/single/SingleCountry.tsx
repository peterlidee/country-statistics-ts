import Head from 'next/head'
import Header from '../header/Header'
import Sources from '../sources/Sources'
import Source from '../sources/Source'
import BreadCrumb from './BreadCrumb'

import { SingleCountryType } from '@/types/singleCountry'

import SingleCountryHeader from './sections/SingleCountryHeader'
import SingleCountryStatus from './sections/SingleCountryStatus'
import SingleCountryFlags from './sections/SingleCountryFlags'
import SingleCountryBasisStats from './sections/SingleCountryBasicStats'
import SingleCountryWeather from './sections/SingleCountryWeather'
import SingleCountryMap from './sections/SingleCountryMap'
import SingleCountryRegion from './sections/SingleCountryRegion'
import SingleCountryPopulationChart from './sections/SingleCountryPopulationChart'
import { Neighbour } from '@/types/neighbour'

type Props = {
  countryCode: string
  singleEndpoint: string
  singleCountry: SingleCountryType
  neighboursEndpoint: string
  neighbours: Neighbour[]
}

function SingleCountry({
  countryCode,
  singleEndpoint,
  singleCountry,
  neighboursEndpoint,
  neighbours,
}: Props) {
  return (
    <>
      <Head>
        <title>{`Country Statistics of ${singleCountry.countryName}`}</title>
        <meta
          name='description'
          content={`Country Statistics of ${singleCountry.countryName}`}
        />
      </Head>
      <Header />
      <BreadCrumb countryName={singleCountry.countryName} />

      <article className='single-country'>
        <SingleCountryHeader countryName={singleCountry.countryName}>
          <SingleCountryStatus
            loading={false}
            error={false}
            data={singleCountry}
            countryCode={countryCode}
          >
            <Sources>
              {/* since we get data from getStaticProps ... no loading or error */}
              <Source
                label='restcountries.com/{code}'
                endpoint={singleEndpoint}
                error={undefined}
                loading={false}
              />
            </Sources>
          </SingleCountryStatus>
        </SingleCountryHeader>

        <SingleCountryFlags
          countryName={singleCountry.countryName}
          flag={singleCountry.flag}
          coatOfArms={singleCountry.coatOfArms}
        />

        <SingleCountryBasisStats
          population={singleCountry.population}
          area={singleCountry.area}
        />

        <SingleCountryWeather
          loading={false}
          error={undefined}
          cca2={singleCountry.cca2}
          capitalName={singleCountry.capital}
          countryCode={countryCode}
        />

        <SingleCountryMap singleCountry={singleCountry} />

        <SingleCountryRegion
          singleCountry={singleCountry}
          neighboursEndpoint={neighboursEndpoint}
          neighbours={neighbours}
        />

        <SingleCountryPopulationChart countryCode={countryCode} />
      </article>
    </>
  )
}

export default SingleCountry
