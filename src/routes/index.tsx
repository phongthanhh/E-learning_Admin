import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

const AdminLayout = lazy(() => import('../layouts/admin'))
const User = lazy(() => import('../pages/users'))
const SyncUser = lazy(() => import('../pages/sync-user'))

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
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
