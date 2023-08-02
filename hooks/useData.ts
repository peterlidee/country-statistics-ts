import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

export function useData(
  key: string,
  code: string,
  endpoint: string,
  options: {} = {},
) {
  return useQuery({
    queryKey: [key, code, endpoint],
    queryFn: () => axios.get(endpoint),
    ...options,
  })
}
