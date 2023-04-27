import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table } from 'components'
import { QUERY_KEY } from 'constant'
import { CourseQuery, RegisterCourse } from 'models'
import React, { memo, useMemo } from 'react'
import { toast } from 'react-toastify'
import { getWaitingUsersApi, registerCourseApi } from 'services'
import { uid } from 'utils'
import columns from './column'

interface Props {
  courseCode: CourseQuery
}

function WaitingUsers({ courseCode }: Props) {
  const queryClient = useQueryClient()

  const waitingUserQuery = useQuery({
    queryKey: [QUERY_KEY.WAITING_USERS],
    queryFn: () => getWaitingUsersApi(courseCode),
    keepPreviousData: true
  })

  const rows = useMemo(
    () => waitingUserQuery.data?.map((item) => ({ id: uid(), ...item })),
    [waitingUserQuery.data]
  )

  const registerMutation = useMutation({
    mutationFn: (data: RegisterCourse) => registerCourseApi(data)
  })

  const handleRegisterCourse = (data: RegisterCourse) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        toast.success('Registration successfully!')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.WAITING_USERS] })
      }
    })
  }
  return (

    <Table
      height={400}
      dataGridProps={{
        rows: rows || [],
        columns: columns({ handleRegisterCourse }),
        loading: waitingUserQuery.isFetching
      }}
    />
  )
}
export default memo(WaitingUsers)
