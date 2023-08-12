import Head from 'next/head'
import Header from '../header/Header'
import Sources from '../sources/Sources'
import Source from '../sources/Source'
import BreadCrumb from './BreadCrumb'

import { SingleCountryType } from '@/types/singleCountry'
import { Neighbour } from '@/types/neighbour'
import { CoordinatesData } from '@/types/coordinates'

import SingleCountryHeader from './sections/SingleCountryHeader'
import SingleCountryStatus from './sections/SingleCountryStatus'
import SingleCountryFlags from './sections/SingleCountryFlags'
import SingleCountryBasisStats from './sections/SingleCountryBasicStats'
import SingleCountryWeather2 from './sections/SingleCountryWeather2'
import SingleCountryMap from './sections/SingleCountryMap'
import SingleCountryRegion from './sections/SingleCountryRegion'
import SingleCountryPopulationChart from './sections/SingleCountryPopulationChart'

import PropTypes from 'prop-types'
import { neighbourPropTypes } from '@/propTypes/neighbourPropTypes'
import { coordinatesDataPropTypes } from '@/propTypes/coordinatesPropTypes'
import { singleCountryPropTypes } from '@/propTypes/singleCountryPropTypes'

type Props = {
  countryCode: string
  singleEndpoint: string
  singleCountry: SingleCountryType
  neighboursEndpoint: string
  neighbours: Neighbour[]
  coordinatesData: CoordinatesData
}

function SingleCountry({
  countryCode,
  singleEndpoint,
  singleCountry,
  neighboursEndpoint,
  neighbours,
  coordinatesData,
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
            isError={false}
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
                type='SSG'
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

        <SingleCountryWeather2
          cca2={singleCountry.cca2}
          capitalName={singleCountry.capital}
        />

        <SingleCountryMap
          singleCountry={singleCountry}
          coordinatesData={coordinatesData}
        />

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

SingleCountry.propTypes = {
  countryCode: PropTypes.string.isRequired,
  singleEndpoint: PropTypes.string.isRequired,
  singleCountry: singleCountryPropTypes.isRequired,
  neighboursEndpoint: PropTypes.string.isRequired,
  neighbours: PropTypes.arrayOf(neighbourPropTypes).isRequired,
  coordinatesData: coordinatesDataPropTypes,
}

export default SingleCountry
