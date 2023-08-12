import { SingleCountryType } from '@/types/singleCountry'

const singleCountryMock: SingleCountryType[] = [
  {
    countryName: 'Algeria',
    tld: '.dz',
    cca2: 'DZ',
    cca3: 'DZA',
    capital: 'Algiers',
    region: 'Africa',
    subregion: 'Northern Africa',
    borders: ['TUN', 'LBY', 'NER', 'ESH', 'MRT', 'MLI', 'MAR'],
    area: 2381741,
    population: 44700000,
    flag: 'https://flagcdn.com/dz.svg',
    coatOfArms: 'https://mainfacts.com/media/images/coats_of_arms/dz.svg',
  },
  // same country without subregion
  {
    countryName: 'Algeria',
    tld: '.dz',
    cca2: 'DZ',
    cca3: 'DZA',
    capital: 'Algiers',
    subregion: '',
    region: 'Africa',
    borders: ['TUN', 'LBY', 'NER', 'ESH', 'MRT', 'MLI', 'MAR'],
    area: 2381741,
    population: 44700000,
    flag: 'https://flagcdn.com/dz.svg',
    coatOfArms: 'https://mainfacts.com/media/images/coats_of_arms/dz.svg',
  },
  // same country with no capital
  {
    countryName: 'Algeria',
    capital: '',
    tld: '.dz',
    cca2: 'DZ',
    cca3: 'DZA',
    region: 'Africa',
    subregion: 'Northern Africa',
    borders: ['TUN', 'LBY', 'NER', 'ESH', 'MRT', 'MLI', 'MAR'],
    area: 2381741,
    population: 44700000,
    flag: 'https://flagcdn.com/dz.svg',
    coatOfArms: 'https://mainfacts.com/media/images/coats_of_arms/dz.svg',
  },
  // different country
  {
    countryName: 'Belgium',
    capital: 'Brussels',
    cca2: 'BE',
    cca3: 'BEL',
    tld: '.be',
    region: 'Europe',
    subregion: 'Western Europe',
    borders: ['FRA', 'DEU', 'NLD', 'LUX'],
    area: 30528,
    population: 11555997,
    flag: 'https://flagcdn.com/be.svg',
    coatOfArms: 'https://mainfacts.com/media/images/coats_of_arms/be.svg',
  },
]

export { singleCountryMock }
