import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

function Home() {
  return <div>Content</div>
}

const AdminLayout = lazy(() => import('../layouts/admin'))

function AppRoutes() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
