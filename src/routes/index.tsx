import { Loading } from 'components'
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
        <Route path={ROUTES_NAME.ADMIN} element={<AdminLayout />}>
          <Route index element={<HomeAdmin />} />
        </Route>
        <Route path={ROUTES_NAME.USERS} element={<AdminLayout />}>
          <Route index element={<User />} />
        </Route>
        <Route path={ROUTES_NAME.COURSE} element={<AdminLayout />}>
          <Route index element={<Course />} />
        </Route>
        <Route path={ROUTES_NAME.COURSE_REGISTER} element={<AdminLayout />}>
          <Route index element={<CourseRegister />} />
        </Route>
        <Route path={ROUTES_NAME.USERS_REGISTER} element={<AdminLayout />}>
          <Route index element={<UserRegister />} />
        </Route>
        <Route path="/sync-user" element={<SyncUser />} />
      </Routes>
    </Suspense>
  )
}

export default AppRoutes
