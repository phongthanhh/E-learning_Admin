import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY, ROUTES_NAME } from 'constant'
import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router'

interface Props {
  children: ReactElement
}

export function ProtectedRoute({ children }: Props) {
  const adminInfoQuery = useQuery({
    queryKey: [QUERY_KEY.ADMIN_INFO]
  })
  console.log(adminInfoQuery)
  const authenticated = adminInfoQuery.data
  if (!authenticated) {
    return <Navigate to={ROUTES_NAME.SIGN_OUT} replace />
  }

  return children || <Outlet />
}
