import { Paper, Divider } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table } from 'components'
import { DEFAULT_PAG, QUERY_KEY } from 'constant'
import { useQueryParams } from 'hooks'
import {
  Pagination, SearchParams, UserNameParams, UserToEdit
} from 'models'
import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { delUserApi, getUsersWithPagApi } from 'services'
import { uid } from 'utils'
import QueryString from 'query-string'
import { toast } from 'react-toastify'
import columns from './column'
import CreateUserModal from './CreateUserModal'
import Search from './Search'
import EditModal from './EditModal'

function User() {
  const [userToEdit, setUserToEdit] = useState<UserToEdit | Record<string, never>>({})

  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false)

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queryParams: Partial<Pagination & SearchParams> = useQueryParams()
  const { page, pageSize, tuKhoa } = queryParams

  const paginationModel = {
    page: Number(page) || DEFAULT_PAG.page,
    pageSize: Number(pageSize) || DEFAULT_PAG.pageSize
  }
  console.log('paginationModel', paginationModel)

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

  const handleSetUserToEdit = (params: UserToEdit) => {
    setUserToEdit(params)
    onOpenEditModal()
  }

  const delUserMutation = useMutation({
    mutationFn: (userNameQuery: UserNameParams) => delUserApi(userNameQuery)
  })
  const queryClient = useQueryClient()
  const handleDelUser = (userNameQuery: UserNameParams) => {
    delUserMutation.mutate(userNameQuery, {
      onSuccess: () => {
        toast.success('Delete user successfully!')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] })
      }
    })
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
            columns: columns({ handleSetUserToEdit, handleDelUser }),
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
        onClose={onCloseCreateUserModal}
      />
      {/* Edit user */}
      <EditModal
        userToEdit={userToEdit}
        open={isOpenEditModal}
        onClose={onCloseEditModal}
      />
    </>
  )
}

export default User
