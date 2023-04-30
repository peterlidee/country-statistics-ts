import Head from 'next/head'
import Header from './header/Header'
import CountryList from './countryList/CountryList'
import Sources from './sources/Sources'
import Source from './sources/Source'
import { HomeProps } from '@/pages'

function Home({ countries, filterData, endpoint }: HomeProps) {
  return (
    <>
      <Head>
        <title>Country Statistics - a portfolio project</title>
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
          />
        </Sources>
      </div>
    </>
  )
}

export default Home
