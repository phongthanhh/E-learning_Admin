import { Paper, Divider } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'components'
import { DEFAULT_PAG, QUERY_KEY } from 'constant'
import { useQueryParams } from 'hooks'
import {
  Pagination, SearchParams, UserNameQuery
} from 'models'
import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getUsersWithPagApi } from 'services'
import { uid } from 'utils'
import QueryString from 'query-string'
import columns from './column'
import InfoUserModal from './InfoUserModal'

function UserRegister() {
  const [userName, setUserName] = useState<UserNameQuery>({ taiKhoan: '' })
  const [isOpenInfoUserModal, setIsOpenInfoUserModal] = useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queryParams: Partial<Pagination & SearchParams> = useQueryParams()
  const { page, pageSize, tuKhoa } = queryParams

  const paginationModel = {
    page: Number(page) || DEFAULT_PAG.page,
    pageSize: Number(pageSize) || DEFAULT_PAG.pageSize
  }

  const queryToSearch = { ...paginationModel, tuKhoa }

  const usersQuery = useQuery({
    queryKey: [QUERY_KEY.USERS, queryToSearch],
    queryFn: () => getUsersWithPagApi(queryToSearch),
    keepPreviousData: true
  })

  const rows = useMemo(
    () => usersQuery.data?.items.map((item) => ({ id: uid(), ...item })),
    [usersQuery.data]
  )

  const onPaginationModelChange = useCallback((pagination: GridPaginationModel) => {
    navigate({
      pathname,
      search: QueryString.stringify({ ...queryParams, ...pagination })
    })
  }, [pathname, queryParams, navigate])

  const onOpenInfoUserModal = useCallback(() => {
    setIsOpenInfoUserModal(true)
  }, [])

  const onCloseInfoUserModal = useCallback(() => {
    setIsOpenInfoUserModal(false)
  }, [])

  const handleSetUserName = (userNameParam: UserNameQuery) => {
    onOpenInfoUserModal()
    setUserName(userNameParam)
  }

  return (
    <>
      <Paper elevation={5}>
        <Divider variant="middle" />
        <Table
          dataGridProps={{
            rows: rows || [],
            columns: columns({ handleSetUserName }),
            loading: usersQuery.isFetching,
            paginationModel,
            rowCount: usersQuery.data?.totalCount || 0,
            onPaginationModelChange,
            pageSizeOptions: [5, 10, 15, 20]
          }}
        />
      </Paper>

      {/* Info users */}
      <InfoUserModal
        userName={userName}
        open={isOpenInfoUserModal}
        onClose={onCloseInfoUserModal}
      />
    </>
  )
}

export default UserRegister
