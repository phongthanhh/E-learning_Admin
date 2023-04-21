/* eslint-disable @typescript-eslint/no-unused-vars */
import { Divider, Paper } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table } from 'components'
import { DEFAULT_PAG, QUERY_KEY } from 'constant'
import { useQueryParams } from 'hooks'
import {
  ICourse,
  CourseQuery,
  CourseToCreate,
  Pagination, SearchParams, UserNameParams, UserToEdit
} from 'models'
import queryString from 'query-string'
import { useCallback, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { delUserApi, getCourseDetailApi, getCoursesWithPagApi } from 'services'
import { uid } from 'utils'
import columns from './column'
import CreateCourseModal from './CreateCourseModal'
import EditCourseModal from './EditCourseModal'
import Search from './Search'

export default function Course() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [isOpenCreateCourseModal, setIsOpenCreateCourseModal] = useState(false)

  const [isOpenEditModal, setIsOpenEditModal] = useState(false)

  const [courseToEdit, setCourseToEdit] = useState<ICourse | Record<string, never>>({})

  const queryParams: Partial<Pagination & SearchParams> = useQueryParams()

  const { page, pageSize, tenKhoaHoc } = queryParams

  const paginationModel = {
    page: Number(page) || DEFAULT_PAG.page,
    pageSize: Number(pageSize) || DEFAULT_PAG.pageSize
  }

  const queryToSearch = { ...paginationModel, tenKhoaHoc }

  const coursesQuery = useQuery({
    queryKey: [QUERY_KEY.COURSES, queryToSearch],
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

  const onCloseCreateCourseModal = useCallback(() => {
    setIsOpenCreateCourseModal(false)
  }, [])

  const onOpenEditCourseModal = useCallback(() => {
    setIsOpenEditModal(true)
  }, [])

  const onCloseEditCourseModal = useCallback(
    () => setIsOpenEditModal(false),
    []
  )

  const getCourseDetailMutation = useMutation({
    mutationFn: (courseQueryParams: CourseQuery) => getCourseDetailApi(courseQueryParams)
  })

  const handleGetCourseToEdit = (params: CourseQuery) => {
    getCourseDetailMutation.mutate(params, {
      onSuccess: (data: ICourse) => {
        setCourseToEdit(data)
      }
    })
    onOpenEditCourseModal()
  }

  const actions = useMemo(() => ([
    { text: 'Create course', onClick: () => setIsOpenCreateCourseModal(true) }
  ]), [])

  const delCourseMutation = useMutation({
    mutationFn: (userNameQuery: UserNameParams) => delUserApi(userNameQuery)
  })

  const handleDelCourse = (userNameQuery: UserNameParams) => {
    delCourseMutation.mutate(userNameQuery, {
      onSuccess: () => {
        toast.success('Delete course successfully!')
        queryClient.invalidateQueries({ queryKey: ['courses'] })
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
            columns: columns({ handleGetCourseToEdit }),
            loading: coursesQuery.isFetching,
            paginationModel,
            rowCount: coursesQuery.data?.totalCount || 0,
            onPaginationModelChange,
            pageSizeOptions: [5, 10, 15, 20]
          }}
        />
      </Paper>

      <CreateCourseModal
        open={isOpenCreateCourseModal}
        onClose={onCloseCreateCourseModal}
      />
      <EditCourseModal
        courseToEdit={courseToEdit}
        open={isOpenEditModal}
        onClose={onCloseEditCourseModal}
      />
    </>

  )
}
