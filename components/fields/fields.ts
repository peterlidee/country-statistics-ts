import { Fields } from './types/fields'

const fields: Fields = [
  {
    slug: 'country',
    label: 'Country',
    sortAscDefault: true,
    sortType: 'text',
    legend: '',
    displayToggle: false,
  },
  {
    slug: 'population',
    label: 'Population',
    sortAscDefault: false,
    sortType: 'number',
    legend: 'Inhabitants',
    displayToggle: true,
  },
  {
    slug: 'area',
    label: 'Area',
    sortAscDefault: false,
    sortType: 'number',
    legend: 'Km²',
    displayToggle: true,
  },
  {
    slug: 'density',
    label: 'Density',
    sortAscDefault: false,
    sortType: 'number',
    legend: 'Inh./km²',
    displayToggle: true,
  },
]

export default fields
