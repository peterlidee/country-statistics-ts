import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import SingleCountry from '../../components/single/SingleCountry'
import { compileSingleCountry } from '@/lib/single/compileSingleCountry'
import compileNeighbouringCountries from '@/lib/single/compileNeighbouringCountries'
import { Neighbour } from '@/types/neighbour'
import { SingleCountryType } from '@/types/singleCountry'

type Props = {
  countryCode: string
  singleEndpoint: string
  singleCountry: SingleCountryType
  neighboursEndpoint: string
  neighbours: Neighbour[]
}

const Country: NextPage<Props> = ({
  countryCode,
  singleEndpoint,
  singleCountry,
  neighboursEndpoint,
  neighbours,
}) => (
  <SingleCountry
    countryCode={countryCode}
    singleEndpoint={singleEndpoint}
    singleCountry={singleCountry}
    neighboursEndpoint={neighboursEndpoint}
    neighbours={neighbours}
  />
)

export const getStaticPaths: GetStaticPaths = async () => {
  // get all the possible endpoints
  const pathsEndpoint = 'https://restcountries.com/v3.1/all?fields=cca3'
  // make the fetch
  const res = await fetch(pathsEndpoint)
  const countryCodes: { cca3: string }[] = await res.json()
  // return the cca3 codes in correct format
  const paths = countryCodes.map((countryCode) => ({
    params: { countryCode: countryCode.cca3 },
  }))

  return {
    paths,
    fallback: false, // see notes on top
  }
}

export const getStaticProps: GetStaticProps = async (context) => {
  // we make 2 fetches
  // 1. singleCountry
  // 2. neighbours

  // 1. fetch singleCountry
  // get url param out of context
  const countryCode = context?.params?.countryCode

  // the endpoint
  /* 
    we used to call the endpoint with specific fields
    f.e. https://restcountries.com/v3.1/alpha/${countryCode}?fields=name
    But, the api isn't consistent here and we had to abandon it
    https://restcountries.com/v3.1/alpha/${countryCode} returns [{country}]
    https://restcountries.com/v3.1/alpha/${countryCode}?fields=name returns {country}
    Now, we call api without fields param, this increases the traffic but avoids critical errors
    
    // old endpoint
    const singleEndpoint = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,population,area,subregion,region,flags,coatOfArms,capital,capitalInfo,cca2,borders,latlng,tld`;
  */

  // make fetch
  // new endpoint
  const singleEndpoint = `https://restcountries.com/v3.1/alpha/${countryCode}`
  const res = await fetch(singleEndpoint)
  const rawCountries = await res.json()

  // this call usually returns a single object in an array (one exception is brunei/bahrain)
  // so, we filter out the country with the corresponding cca3
  const rawCountry = rawCountries.find(
    (country: any) => country.cca3 === countryCode,
  )

  const singleCountry = compileSingleCountry(rawCountry)

  // 2. fetch neighbours
  // 2.1 only fetch border when singleCountry.borders is not empty ([].length === 0)
  // 2.2 when there are borders, we need: name and cca3 from all the cca3's in singleCountry.borders

  // 2.1
  const neighboursEndpoint = `https://restcountries.com/v3.1/alpha/?fields=cca3,name;codes=${singleCountry.borders.join(
    ',',
  )}`
  let neighbours: Neighbour[] = []

  // 2.2 only fetch when there are borders
  if (singleCountry.borders.length > 0) {
    const neighbourRes = await fetch(neighboursEndpoint)
    const rawNeighbours: unknown[] = await neighbourRes.json()
    neighbours = compileNeighbouringCountries(rawNeighbours)
  }

  // return props
  return {
    props: {
      countryCode,
      singleEndpoint,
      singleCountry,
      neighboursEndpoint,
      neighbours,
    },
  }
}

export default Country
