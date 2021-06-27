import { useLocation } from 'react-router-dom'
import queryString from 'query-string'

export const useQuery = () => {
  const { search } = useLocation()
  // WH
  const searchQuery = queryString.parse(search)

  return {
    search,
    searchQuery
  }
}
