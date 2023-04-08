import { Paper } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'components'
import { DEFAULT_PAG } from 'constant'
import { useCallback, useMemo, useState } from 'react'
import { getUsersWithPagApi } from 'services'
import { uid } from 'utils'
import CreateUserModal from './CreateUserModal'
import { columns } from './column'

function User() {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>(DEFAULT_PAG)
  const [isOpenCreateUserModal, setIsOpenCreateUserModal] = useState(false)

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

  const onCloseCreateUserModal = useCallback(() => {
    setIsOpenCreateUserModal(false)
  }, [])

  const actions = useMemo(() => ([
    { text: 'Create user', onClick: () => setIsOpenCreateUserModal(true) }
  ]), [])

  return (
    <>
      <Paper elevation={5}>
        <Table
          actions={actions}
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
      </Paper>

      {/* Create users */}
      <CreateUserModal
        open={isOpenCreateUserModal}
        onCloseCreateUserModal={onCloseCreateUserModal}
      />
    </>
  )
}

export default User
