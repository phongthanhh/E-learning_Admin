import { Divider, Paper } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'components'
import { DEFAULT_PAG, QUERY_KEY } from 'constant'
import { useQueryParams } from 'hooks'
import { Pagination, SearchParams } from 'models'
import queryString from 'query-string'
import { useCallback, useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router'
import { getCoursesWithPagApi } from 'services'
import { uid } from 'utils'
import columns from './column'
import InfoCourseModal from './InfoCourseModal'

export default function CourseRegister() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [isOpenInfoCourseModal, setIsOpenInfoCourseModal] = useState(false)

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

  const onOpenInfoCourseModal = useCallback(() => {
    setIsOpenInfoCourseModal(true)
  }, [])

  const onCloseInfoCourseModal = useCallback(() => {
    setIsOpenInfoCourseModal(false)
  }, [])

  return (
    <>
      <Paper elevation={5}>
        <Divider variant="middle" />
        <Table
          dataGridProps={{
            rows: rows || [],
            columns: columns({ onOpenInfoCourseModal }),
            loading: coursesQuery.isFetching,
            paginationModel,
            rowCount: coursesQuery.data?.totalCount || 0,
            onPaginationModelChange,
            pageSizeOptions: [5, 10, 15, 20]
          }}
        />
      </Paper>

      <InfoCourseModal
        open={isOpenInfoCourseModal}
        onClose={onCloseInfoCourseModal}
      />
    </>

  )
}
