import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useChartData(countryCode: string, endpoint: string) {
  return useQuery({
    queryKey: ['single-chart', countryCode, endpoint],
    queryFn: () => axios.get(endpoint),
    // keepPreviousData: true,
    // refetchOnWindowFocus: false,
    // retry: 2,
    cacheTime: 60 * 60 * 1000, // one hour
    staleTime: Infinity, // don't refetch data
  })
}
