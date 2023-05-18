import React, { useMemo, memo } from 'react'
import { Table } from 'components'
import { getUsersRegisterApi, unRegisterCourseApi } from 'services'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { CourseQuery, RegisterCourse } from 'models'
import { uid } from 'utils'
import { QUERY_KEY } from 'constant'
import { toast } from 'react-toastify'
import columns from './column'

interface Props {
  courseCode: CourseQuery
}

function RegisteredUser({ courseCode }: Props) {
  const queryClient = useQueryClient()

  const registerQuery = useQuery({
    queryKey: [QUERY_KEY.REGISTERED_USERS],
    queryFn: () => getUsersRegisterApi(courseCode),
    keepPreviousData: true
  })

  const rows = useMemo(
    () => registerQuery.data?.map((item) => ({ id: uid(), ...item })),
    [registerQuery.data]
  )
  const unRegisterMutation = useMutation({
    mutationFn: (data: RegisterCourse) => unRegisterCourseApi(data)
  })

  const handleUnRegisterCourse = (data: RegisterCourse) => {
    unRegisterMutation.mutate(data, {
      onSuccess: () => {
        toast.success('UnRegistration successfully!')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.REGISTERED_USERS] })
      }
    })
  }

  return (
    <Table
      height={400}
      dataGridProps={{
        rows: rows || [],
        columns: columns({ handleUnRegisterCourse }),
        loading: registerQuery.isFetching
      }}
    />
  )
}

export default memo(RegisteredUser)
