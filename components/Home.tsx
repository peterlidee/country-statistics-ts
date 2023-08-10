import Head from 'next/head'
import Header from './header/Header'
import CountryList from './countryList/CountryList'
import Sources from './sources/Sources'
import Source from './sources/Source'
import { HomeProps } from '@/pages'

// PropTypes
import PropTypes from 'prop-types'
import { countryPropTypes } from '@/propTypes/countryPropTypes'
import { filterDataPropTypes } from '@/propTypes/filterDataPropTypes'

function Home({ countries, filterData, endpoint }: HomeProps) {
  return (
    <>
      <Head>
        <title>Country Statistics TS - a portfolio project</title>
        <meta
          name='description'
          content="An overview of statistics per country, fed by different api's."
        />
      </Head>
      <Header home={true} />
      <CountryList countries={countries} filterData={filterData} />
      <div className='sources__home'>
        <Sources>
          {/* since we use ssg, there is data, no loading cause pre rendered and no error cause build succeeded */}
          <Source
            error={undefined}
            loading={false}
            endpoint={endpoint}
            label='restcountries.com/{all}'
            type='SSG'
          />
        </Sources>
      </div>
    </>
  )
}

Home.propTypes = {
  countries: PropTypes.arrayOf(countryPropTypes).isRequired,
  filterData: filterDataPropTypes.isRequired,
  endpoint: PropTypes.string.isRequired,
}

export default Home
