const fieldsData = [
  {
    slug: 'country',
    label: 'Country',
    sortAscDefault: true,
    sortKey: 'countryName',
    sortType: 'text',
    displayToggle: false,
    legend: '',
    key: 'countryName',
  },
  {
    slug: 'population',
    label: 'Population',
    sortAscDefault: false,
    sortKey: 'population',
    sortType: 'number',
    legend: 'Inhabitants',
    displayToggle: true,
    key: 'populationPrettyFormat',
  },
  {
    slug: 'area',
    label: 'Area',
    sortAscDefault: false,
    sortKey: 'area',
    sortType: 'number',
    legend: 'Km²',
    displayToggle: true,
    key: 'areaPrettyFormat',
  },
  {
    slug: 'density',
    label: 'Density',
    sortAscDefault: false,
    sortKey: 'density',
    sortType: 'number',
    legend: 'Inh./km²',
    displayToggle: true,
    key: 'densityPrettyFormat',
  },
]

export default fieldsData