import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

function getWeather(endpoint: string) {
  return axios.get(endpoint)
}

export function useWeatherData(cca2: string, endpoint: string) {
  return useQuery({
    queryKey: ['single-weather', cca2, endpoint],
    queryFn: () => getWeather(endpoint),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    retry: 2,
    cacheTime: 15 * 60 * 1000,
  })
}
