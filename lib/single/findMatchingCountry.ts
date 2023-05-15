import { Neighbour } from '@/types/neighbour'

// helper function to filter out the matching country
const findMatchingCountry = (border: string, countries: Neighbour[]) =>
  countries.filter((country) => country.cca3 === border)

export default findMatchingCountry
