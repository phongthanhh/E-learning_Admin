/* eslint-disable @typescript-eslint/no-unused-vars */
import AppRoutes from 'routes'
import { Toast } from 'components'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from 'constant'
import { getAdminInfoApi } from 'services'

function App() {
  const adminInfoQuery = useQuery({
    queryKey: [QUERY_KEY.ADMIN_INFO],
    queryFn: () => getAdminInfoApi(),
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
