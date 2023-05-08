const singleCountryMocks = [
  {
    "name": {
      common: "Algeria",
    },
    "cca2": "DZ",
    "ccn3": "012",
    "cca3": "DZA",
    "cioc": "ALG",
    capital: ["Algiers"],
    region: "Africa",
    subregion: "Northern Africa",
    latlng: [28, 3],
    borders: ["TUN","LBY","NER","ESH","MRT","MLI","MAR"],
    area: 2381741,
    population: 44700000,
    flags: {
      png: "https://flagcdn.com/w320/dz.png",
      svg: "https://flagcdn.com/dz.svg"
    },
    coatOfArms: {
      png: "https://mainfacts.com/media/images/coats_of_arms/dz.png",
      svg: "https://mainfacts.com/media/images/coats_of_arms/dz.svg"
    },
  },
  // same country without subregion
  {
    "name": {
      common: "Algeria",
    },
    "cca2": "DZ",
    "ccn3": "012",
    "cca3": "DZA",
    "cioc": "ALG",
    capital: ["Algiers"],
    region: "Africa",
    // subregion: "Northern Africa",
    latlng: [28, 3],
    borders: ["TUN","LBY","NER","ESH","MRT","MLI","MAR"],
    area: 2381741,
    population: 44700000,
    flags: {
      png: "https://flagcdn.com/w320/dz.png",
      svg: "https://flagcdn.com/dz.svg"
    },
    coatOfArms: {
      png: "https://mainfacts.com/media/images/coats_of_arms/dz.png",
      svg: "https://mainfacts.com/media/images/coats_of_arms/dz.svg"
    },
  },
  // same country with no capital
  {
    "name": {
      common: "Algeria",
    },
    "cca2": "DZ",
    "ccn3": "012",
    "cca3": "DZA",
    "cioc": "ALG",
    // capital: ["Algiers"],
    region: "Africa",
    subregion: "Northern Africa",
    latlng: [28, 3],
    borders: ["TUN","LBY","NER","ESH","MRT","MLI","MAR"],
    area: 2381741,
    population: 44700000,
    flags: {
      png: "https://flagcdn.com/w320/dz.png",
      svg: "https://flagcdn.com/dz.svg"
    },
    coatOfArms: {
      png: "https://mainfacts.com/media/images/coats_of_arms/dz.png",
      svg: "https://mainfacts.com/media/images/coats_of_arms/dz.svg"
    },
  },
  // different country
  {
    "name": {
      common: "Fantasia",
    },
    "cca2": "BE",
    "ccn3": "056",
    "cca3": "BEL",
    "cioc": "BEL",
    capital: ["Brussels"],
    region: "Europe",
    subregion: "Western Europe",
    latlng: [50.83333333, 4],
    borders: ["FRA","DEU","NLD","LUX"],
    area: 30528,
    population: 11555997,
    flags: {
      png: "https://flagcdn.com/w320/be.png",
      svg: "https://flagcdn.com/be.svg"
      
    },
    coatOfArms: {
      png: "https://mainfacts.com/media/images/coats_of_arms/be.png",
      svg: "https://mainfacts.com/media/images/coats_of_arms/be.svg"
    },
  },
]

export default singleCountryMocks