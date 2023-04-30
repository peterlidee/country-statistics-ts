import { GetStaticProps, NextPage } from 'next'
import Home from '../components/Home'
import compileData from '../lib/data/compileData'
import getFilterData from '../lib/data/getFilterData'
import { Country } from '@/types/country'
import { FilterDataType } from '@/types/filterData'

// todo change any

type HomePageProps = {
  countries: Country[]
  filterData: FilterDataType
  endpoint: string
}

const HomePage: NextPage<HomePageProps> = ({
  countries,
  filterData,
  endpoint,
}) => <Home countries={countries} endpoint={endpoint} filterData={filterData} />

// all of this happens at build time
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const endpoint =
    'https://restcountries.com/v3.1/all?fields=cca3,area,name,population,subregion,region'

  const res = await fetch(endpoint)
  const countries = await res.json()

  // we need to do some cleanup and some adding to the data
  // we do in this component to prevent rerendering on filtering or display changes
  const compiledCountries = compileData(countries)

  // calculate filter data from the country data
  // we need data to filter along: region, subregion, population, area and density
  const filterData = getFilterData(compiledCountries)

  return {
    props: {
      countries: compiledCountries,
      filterData: filterData,
      endpoint: endpoint,
    },
  }
}

export default HomePage
