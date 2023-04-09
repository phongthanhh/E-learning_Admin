import { Divider, Paper } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'components'
import { DEFAULT_PAG } from 'constant'
import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getUsersWithPagApi } from 'services'
import { uid } from 'utils'
import QueryString from 'query-string'
import { useQueryParams } from 'hooks'
import { IPagination, ISearchParams } from 'models'
import CreateUserModal from './CreateUserModal'
import { columns } from './column'
import Search from './Search'

function User() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queryParams: Partial<IPagination & ISearchParams> = useQueryParams()
  const { page, pageSize, tuKhoa } = queryParams

  const paginationModel = {
    page: Number(page) || DEFAULT_PAG.page,
    pageSize: Number(pageSize) || DEFAULT_PAG.pageSize
  }

  const queryToSearch = { ...paginationModel, tuKhoa }

  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false)

  const usersQuery = useQuery({
    queryKey: ['users', queryToSearch],
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
      search: `?${QueryString.stringify(pagination)}`
    })
  }, [pathname, navigate])

  const onCloseCreateUserModal = useCallback(() => {
    setIsOpenCreateUserModal(false)
  }, [])

  const actions = useMemo(() => ([
    { text: 'Create user', onClick: () => setIsOpenCreateUserModal(true) }
  ]), [])

  return (
    <>
      <Paper elevation={5}>
        <Search />
        <Divider variant="middle" />
        <Table
          actions={actions}
          dataGridProps={{
            rows: rows || [],
            columns,
            loading: usersQuery.isFetching,
            paginationModel,
            rowCount: usersQuery.data?.totalCount || 0,
            onPaginationModelChange,
            pageSizeOptions: [5, 10, 15, 20]
          }}
        />
      </Paper>

      {/* Create users */}
      <CreateUserModal
        open={isOpenCreateUserModal}
        onCloseCreateUserModal={onCloseCreateUserModal}
      />
    </>
  )
}

export default User
