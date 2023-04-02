import { User } from 'pages'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

const AdminLayout = lazy(() => import('../layouts/admin'))

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<User />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
