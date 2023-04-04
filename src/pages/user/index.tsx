/* eslint-disable @typescript-eslint/no-magic-numbers */
import { Paper, Button } from '@mui/material'
import { getUsersWithPagApi } from 'services'
import { useQuery } from '@tanstack/react-query'
import { DEFAULT_PAG } from 'constant'
import { uid } from 'utils'
import { useCallback, useMemo, useState } from 'react'
import { Table } from 'components'
import { GridPaginationModel } from '@mui/x-data-grid'
import { columns } from './column'

function User() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAG)

  const usersQuery = useQuery({
    queryKey: ['users', paginationModel],
    queryFn: () => getUsersWithPagApi({ ...paginationModel }),
    keepPreviousData: true
  })

  const rows = useMemo(
    () => usersQuery.data?.items.map((item) => ({ id: uid(), ...item })),
    [usersQuery.data]
  )

  const onPaginationModelChange = useCallback((pagination: GridPaginationModel) => {
    setPaginationModel(pagination)
  }, [])

  return (
    <Paper sx={{ p: 2 }}>
      <div style={{ marginBottom: '10px' }}>
        <Button variant="contained" color="success">Thêm khóa học</Button>
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <Table
          dataGridProps={{
            rows: rows || [],
            columns,
            loading: usersQuery.isFetching,
            paginationModel,
            rowCount: usersQuery.data?.totalCount || 0,
            onPaginationModelChange,
            pageSizeOptions: [5, 10, 15, 20]
          }}
        />
      </div>
    </Paper>
  )
}

export default User
