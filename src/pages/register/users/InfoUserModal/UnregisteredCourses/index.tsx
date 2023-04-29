import React, { memo, useMemo } from 'react'

import { Table } from 'components'
import { getUnregisteredCourseOfUserApi } from 'services'
import { useQuery } from '@tanstack/react-query'
import { UserNameQuery } from 'models'
import { uid } from 'utils'
import { QUERY_KEY } from 'constant'
import columns from './column'

interface Props {
  userName: UserNameQuery
}

function UnregisteredCourses({ userName }: Props) {
  const unregisterQuery = useQuery({
    queryKey: [QUERY_KEY.UNREGISTERED_USERS],
    queryFn: () => getUnregisteredCourseOfUserApi({ TaiKhoan: userName.taiKhoan }),
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

export default memo(UnregisteredCourses)
