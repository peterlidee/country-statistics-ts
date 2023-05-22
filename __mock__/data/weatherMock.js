const weatherMocks = [
  {
    coord: { lon: 4.3488, lat: 50.8504 },
    weather: [
      { id: 803, main: 'Clouds', description: 'broken clouds', icon: '04d' },
    ],
    base: 'stations',
    main: {
      temp: 18.55,
      feels_like: 18.47,
      temp_min: 15.99,
      temp_max: 21.51,
      pressure: 1017,
      humidity: 77,
    },
    visibility: 6000,
    wind: { speed: 3.6, deg: 300 },
    clouds: { all: 75 },
    dt: 1684761485,
    sys: {
      type: 1,
      id: 1227,
      country: 'BE',
      sunrise: 1684727088,
      sunset: 1684784038,
    },
    timezone: 7200,
    id: 2800866,
    name: 'Brussels',
    cod: 200,
  },
  { cod: '404', message: 'city not found' },
]

export { weatherMocks }
