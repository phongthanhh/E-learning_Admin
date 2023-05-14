/* eslint-disable @typescript-eslint/no-unused-vars */
import AppRoutes from 'routes'
import { Toast } from 'components'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY, Storage } from 'constant'
import { getAdminInfoApi } from 'services'

function App() {
  const accessTokenLocal = localStorage.getItem(Storage.ACCESS_TOKEN)
  const adminInfoQuery = useQuery({
    queryKey: [QUERY_KEY.ADMIN_INFO],
    queryFn: () => getAdminInfoApi(),
    enabled: Boolean(accessTokenLocal),
    retry: 0
  })
  return (
    <>
      <Toast />
      <AppRoutes />
    </>
  )
}

export default App
