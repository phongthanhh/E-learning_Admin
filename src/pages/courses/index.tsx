/* eslint-disable @typescript-eslint/no-unused-vars */
import { Divider, Paper } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table } from 'components'
import { DEFAULT_PAG } from 'constant'
import { useQueryParams } from 'hooks'
import {
  Pagination, SearchParams, UserNameParams, UserToEdit
} from 'models'
import queryString from 'query-string'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { delUserApi, getCoursesWithPagApi } from 'services'
import { uid } from 'utils'
import columns from './column'

export default function Course() {
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false)

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const [userToEdit, setUserToEdit] = useState<UserToEdit | Record<string, never>>({})

  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queryParams: Partial<Pagination & SearchParams> = useQueryParams()

  const { page, pageSize, tenKhoaHoc } = queryParams

  const paginationModel = {
    page: Number(page) || DEFAULT_PAG.page,
    pageSize: Number(pageSize) || DEFAULT_PAG.pageSize
  }
  console.log(paginationModel)

  const queryToSearch = { ...paginationModel, tenKhoaHoc }

  const coursesQuery = useQuery({
    queryKey: ['courses', queryToSearch],
    queryFn: () => getCoursesWithPagApi(queryToSearch),
    keepPreviousData: true
  })

  const rows = useMemo(
    () => coursesQuery.data?.items.map((item) => ({ id: uid(), ...item })),
    [coursesQuery.data]
  )

  const onPaginationModelChange = useCallback((pagination: GridPaginationModel) => {
    navigate({
      pathname,
      search: queryString.stringify({ ...queryParams, ...pagination })
    })
  }, [pathname, queryParams, navigate])

  const onCloseCreateUserModal = useCallback(() => {
    setIsOpenCreateUserModal(false)
  }, [])

  const actions = useMemo(() => ([
    { text: 'Create course', onClick: () => setIsOpenCreateUserModal(true) }
  ]), [])

  const delUserMutation = useMutation({
    mutationFn: (userNameQuery: UserNameParams) => delUserApi(userNameQuery)
  })
  const queryClient = useQueryClient()
  const handleDelUser = (userNameQuery: UserNameParams) => {
    delUserMutation.mutate(userNameQuery, {
      onSuccess: () => {
        toast.success('Delete user successfully!')
        queryClient.invalidateQueries({ queryKey: ['courses'] })
      }
    })
  }

  return (
    <Paper elevation={5}>
      {/* <Search /> */}
      <Divider variant="middle" />
      <Table
        actions={actions}
        dataGridProps={{
          rows: rows || [],
          columns: columns(),
          loading: coursesQuery.isFetching,
          paginationModel,
          rowCount: coursesQuery.data?.totalCount || 0,
          onPaginationModelChange,
          pageSizeOptions: [5, 10, 15, 20]
        }}
      />
    </Paper>
  )
}
