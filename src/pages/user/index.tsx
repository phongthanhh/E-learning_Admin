import { DataGrid } from '@mui/x-data-grid'
import { Paper, Button } from '@mui/material'
import { getUsersWithPagApi } from 'services'
import { useQuery } from '@tanstack/react-query'
import { DEFAULT_PAG } from 'constant'
import { uid } from 'utils'
import { useMemo } from 'react'
import { columns } from './column'

export default function User() {
  const usersQuery = useQuery({
    queryKey: ['users'],
    queryFn: () => getUsersWithPagApi({ ...DEFAULT_PAG })
  })

  const rows = useMemo(
    () => usersQuery.data?.items.map((item) => ({ id: uid(), ...item })),
    [usersQuery.data?.items]
  )

  return (
    <Paper sx={{ p: 2 }}>
      <div style={{ marginBottom: '10px' }}>
        <Button variant="contained" color="success">Thêm khóa học</Button>
      </div>
      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows || []}
          columns={columns}
          loading={usersQuery.isLoading}
        />
      </div>
    </Paper>
  )
}
