import { Loading, ProtectedRoute } from 'components'
import { ROUTES_NAME } from 'constant'
import {
  Course, CourseRegister, HomeAdmin, UserRegister
} from 'pages'
import SyncUser from 'pages/sync-user'
import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router'

const AdminLayout = lazy(() => import('../layouts/admin'))
const User = lazy(() => import('../pages/users'))

function AppRoutes() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        <Route path={ROUTES_NAME.ROOT} element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route index element={<HomeAdmin />} />
          <Route path={ROUTES_NAME.USERS} element={<User />} />
          <Route path={ROUTES_NAME.COURSE} element={<Course />} />
          <Route path={ROUTES_NAME.COURSE_REGISTER} element={<CourseRegister />} />
          <Route path={ROUTES_NAME.USERS_REGISTER} element={<UserRegister />} />
        </Route>
        <Route path="/sync-user" element={<SyncUser />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
