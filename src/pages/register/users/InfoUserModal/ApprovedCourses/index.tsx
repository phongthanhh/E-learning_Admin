import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Table } from 'components'
import { QUERY_KEY } from 'constant'
import { UserNameQuery } from 'models'
import React, { memo, useMemo } from 'react'
import { toast } from 'react-toastify'
import { getRegisteredCourseOfUserApi, unRegisterCourseApi } from 'services'
import { uid } from 'utils'
import columns from './column'

interface Props {
  userName: UserNameQuery
}

function ApprovedCourses({ userName }: Props) {
  const queryClient = useQueryClient()

  const registerQuery = useQuery({
    queryKey: [QUERY_KEY.APPROVED_COURSE],
    queryFn: () => getRegisteredCourseOfUserApi(userName),
    keepPreviousData: true
  })

  const rows = useMemo(
    () => registerQuery.data?.map((item) => ({ id: uid(), ...item })),
    [registerQuery.data]
  )

  const unRegisterMutation = useMutation({
    mutationFn: (courseQuery: string) => unRegisterCourseApi({
      ...userName,
      maKhoaHoc: courseQuery
    })
  })

  const handleUnRegisterCourse = (courseQuery: string) => {
    unRegisterMutation.mutate(courseQuery, {
      onSuccess: () => {
        toast.success('UnRegistration successfully!')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.APPROVED_COURSE] })
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

export default memo(ApprovedCourses)
