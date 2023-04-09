import { Loading } from 'components'
import SyncUser from 'pages/sync-user'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

const AdminLayout = lazy(() => import('../layouts/admin'))
const User = lazy(() => import('../pages/users'))

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<User />} />
        </Route>
        <Route path="/sync-user" element={<SyncUser />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
