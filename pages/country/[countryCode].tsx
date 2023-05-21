import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import SingleCountry from '../../components/single/SingleCountry'
import { compileSingleCountry } from '@/lib/single/compileSingleCountry'

type Props = {
  countryCode: string
  singleEndpoint: string
  singleCountry: any
}

const Country: NextPage<Props> = ({
  countryCode,
  singleEndpoint,
  singleCountry,
}) => (
  <SingleCountry
    countryCode={countryCode}
    singleEndpoint={singleEndpoint}
    singleCountry={singleCountry}
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

  // return props
  return {
    props: {
      countryCode,
      singleEndpoint,
      singleCountry,
    },
  }
}

export default Country
