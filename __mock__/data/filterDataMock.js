// filterData based on extraDataCountries in mockCountry.js

const defaultRegionState = {
  'Africa': {
    subregionNames: ['Northern Africa'],
  },
  'Americas': {
    subregionNames: ['Caribbean'],
  },
  'Antarctic': {
    subregionNames: [],
  },
  'Europe': {
    subregionNames: ['Central Europe','Northern Europe','Western Europe'],
  },
}

const regionIndexes = {
  'Americas': [4],
  'Caribbean': [4],
  'Europe': [0,1,2],
  'Central Europe' : [0],
  'Northern Europe': [1],
  'Western Europe' : [2],
  'Eastern Europe' : [0],
  'Southern Europe' : [0],
  'Southeast Europe' : [0],
  'Africa': [3],
  'Northern Africa': [3],
  'Antarctic': [5],
}

const area = {
  sliderStart: 0,
  sliderEnd: 450000,
  sliderStep: 25000,
  countryMin: 3903,
  countryMax: 446550,
}

const population = {
  sliderStart: 0,
  sliderEnd: 37500000,
  sliderStep: 2500000,
  countryMin: 30,
  countryMax: 36910558,
}

const density = {
  sliderStart: 0,
  sliderEnd: 400,
  sliderStep: 25,
  countryMin: 0,
  countryMax: 379
}

const filterDataMock = {
  defaultRegionState,
  regionIndexes,
  area,
  population,
  density,
}

export default filterDataMock