/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-magic-numbers */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Paper } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { FormInput, Table } from 'components'
import { DEFAULT_PAG } from 'constant'
import { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { getUsersWithPagApi } from 'services'
import { uid } from 'utils'
import * as yup from 'yup'
import { columns } from './column'
import CreateUserModal from './CreateUserModal'

const schema = yup.object().shape({
  title: yup.string().required('Please fill title')
})

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

  return (
    <Paper sx={{ p: 2 }}>
      <div style={{ marginBottom: '10px' }}>
        <Button onClick={() => setIsOpenCreateUserModal(true)} variant="contained" color="success">Create user</Button>
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

      {/* Create users */}
      <CreateUserModal
        open={isOpenCreateUserModal}
        onCloseCreateUserModal={onCloseCreateUserModal}
      />
    </Paper>
  )
}

export default User
