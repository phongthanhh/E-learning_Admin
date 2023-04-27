import React, { useMemo, memo } from 'react'
import { Table } from 'components'
import { getUsersUnregisterApi } from 'services'
import { useQuery } from '@tanstack/react-query'
import { CourseQuery } from 'models'
import { uid } from 'utils'
import { QUERY_KEY } from 'constant'
import columns from './column'

interface Props {
  courseCode: CourseQuery
}

function UnregisteredUser({ courseCode }: Props) {
  const unregisterQuery = useQuery({
    queryKey: [QUERY_KEY.UNREGISTER_USERS],
    queryFn: () => getUsersUnregisterApi(courseCode),
    keepPreviousData: true
  })

  const rows = useMemo(
    () => unregisterQuery.data?.map((item) => ({ id: uid(), ...item })),
    [unregisterQuery.data]
  )
  return (

    <Table
      height={400}
      dataGridProps={{
        rows: rows || [],
        columns: columns(),
        loading: unregisterQuery.isFetching
      }}
    />
  )
}

export default memo(UnregisteredUser)
