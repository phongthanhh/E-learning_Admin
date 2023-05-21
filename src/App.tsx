import AppRoutes from 'routes'
import { Toast } from 'components'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY, Storage } from 'constant'
import { getAdminInfoApi } from 'services'

function App() {
  useQuery({
    queryKey: [QUERY_KEY.ADMIN_INFO],
    queryFn: () => getAdminInfoApi(),
    retry: 0,
    enabled: Boolean(localStorage.getItem(Storage.ACCESS_TOKEN))
  })
  return (
    <>
      <Toast />
      <AppRoutes />
    </>
  )
}

export default App
