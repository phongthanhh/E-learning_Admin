import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table } from 'components'
import { QUERY_KEY } from 'constant'
import { UserNameQuery } from 'models'
import React, { memo, useMemo } from 'react'
import { toast } from 'react-toastify'
import { getCoursesWaitingApproveApi, registerCourseApi } from 'services'
import { uid } from 'utils'
import columns from './column'

interface Props {
  userName: UserNameQuery
}
function WaitingCourses({ userName }: Props) {
  const queryClient = useQueryClient()
  const waitingUserQuery = useQuery({
    queryKey: [QUERY_KEY.COURSES_OF_USER_WAITING_APPROVAL],
    queryFn: () => getCoursesWaitingApproveApi(userName),
    keepPreviousData: true
  })

  const rows = useMemo(
    () => waitingUserQuery.data?.map((item) => ({ id: uid(), ...item })),
    [waitingUserQuery.data]
  )

  const approveMutation = useMutation({
    mutationFn: (courseCode: string) => registerCourseApi({ ...userName, maKhoaHoc: courseCode })
  })

  const handleApproveCourse = (courseCode: string) => {
    approveMutation.mutate(courseCode, {
      onSuccess: () => {
        toast.success('Registration successfully!')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COURSES_OF_USER_WAITING_APPROVAL] })
      }
    })
  }
  return (
    <Table
      height={400}
      dataGridProps={{
        rows: rows || [],
        columns: columns({ handleApproveCourse }),
        loading: waitingUserQuery.isFetching
      }}
    />
  )
}
export default memo(WaitingCourses)
