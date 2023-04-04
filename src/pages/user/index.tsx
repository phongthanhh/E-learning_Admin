/* eslint-disable @typescript-eslint/no-magic-numbers */
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Paper } from '@mui/material'
import { GridPaginationModel } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { InputField, Table } from 'components'
import { DEFAULT_PAG } from 'constant'
import { useCallback, useMemo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { getUsersWithPagApi } from 'services'
import { uid } from 'utils'
import * as yup from 'yup'
import { columns } from './column'

const schema = yup.object().shape({
  title: yup.string().required('Please fill title')
})

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

  const formMethods = useForm({
    defaultValues: { title: '' },
    resolver: yupResolver(schema)
  })
  const { handleSubmit } = formMethods

  const onSubmit = (formData: { title: string }) => {
    console.log('Tai Vo 🚀 ~ formData:', formData)
  }

  return (
    <Paper sx={{ p: 2 }}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputField name="title" inputFieldProps={{ label: 'Title' }} />
        </form>
      </FormProvider>
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
