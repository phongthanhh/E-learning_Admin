import { Loading } from 'components'
import { ROUTES_NAME, Storage } from 'constant'
import { useQueryParams } from 'hooks'
import { useEffect } from 'react'
import { useNavigate } from 'react-router'

interface QueryParams {
  accessToken: string
  email: string
  hoTen: string
  maLoaiNguoiDung: string
  maNhom: string
  soDT: string
  taiKhoan: string
}

function SyncUser() {
  const queryParams: Partial<QueryParams> = useQueryParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (Object.keys(queryParams).length) {
      const { accessToken = '' } = queryParams
      localStorage.setItem(Storage.ACCESS_TOKEN, accessToken)
      localStorage.setItem(Storage.USER_LOGIN, JSON.stringify(queryParams))
      navigate(ROUTES_NAME.ROOT)
    }
  }, [queryParams, navigate])

  return <Loading />
}

export default SyncUser
