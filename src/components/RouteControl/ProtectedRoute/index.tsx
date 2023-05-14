import { useQueryClient } from '@tanstack/react-query'
import { QUERY_KEY, ROUTES_NAME } from 'constant'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Admin } from 'models'
import { ReactElement } from 'react'
import { Navigate, Outlet } from 'react-router'

interface Props {
  children: ReactElement
}

export function ProtectedRoute({ children }: Props) {
  const queryClient = useQueryClient()
  const adminInfo: Admin | undefined = queryClient.getQueryData([QUERY_KEY.ADMIN_INFO])

  if (adminInfo?.authenticated === false) {
    return <Navigate to={ROUTES_NAME.SIGN_OUT} replace />
  }

  return children || <Outlet />
}
