import { Paper, Divider } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'components'
import { DEFAULT_PAG, QUERY_KEY } from 'constant'
import { useQueryParams } from 'hooks'
import {
  IPagination, ISearchParams, IUserToEdit
} from 'models'
import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getUsersWithPagApi } from 'services'
import { uid } from 'utils'
import QueryString from 'query-string'
import columns from './column'
import CreateUserModal from './CreateUserModal'
import Search from './Search'
import EditModal from './EditModal'

function User() {
  const [userToEdit, setUserToEdit] = useState<IUserToEdit | Record<string, never>>({})

  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false)

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queryParams: Partial<IPagination & ISearchParams> = useQueryParams()
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

  const onCloseCreateUserModal = useCallback(() => {
    setIsOpenCreateUserModal(false)
  }, [])

  const onOpenEditModal = useCallback(() => {
    setIsOpenEditModal(true)
  }, [])

  const onCloseEditModal = useCallback(
    () => setIsOpenEditModal(false),
    []
  )

  const actions = useMemo(() => ([
    { text: 'Create user', onClick: () => setIsOpenCreateUserModal(true) }
  ]), [])

  const handleSetUserToEdit = (params:IUserToEdit) => {
    setUserToEdit(params)
    onOpenEditModal()
  }

  return (
    <>
      <Paper elevation={5}>
        <Search />
        <Divider variant="middle" />
        <Table
          actions={actions}
          dataGridProps={{
            rows: rows || [],
            columns: columns({ handleSetUserToEdit }),
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
      {/* Edit user */}
      <EditModal
        userToEdit={userToEdit}
        open={isOpenEditModal}
        onCloseEditModal={onCloseEditModal}
      />
    </>
  )
}

export default User
