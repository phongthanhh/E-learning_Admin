import { Grid } from '@mui/material'
import { FormInput, SearchBox } from 'components'
import { useQueryParams } from 'hooks'
import { Pagination, SearchParams } from 'models'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import QueryString from 'query-string'

interface DefaultValue {
  tuKhoa: Required<SearchParams>['tuKhoa']
}

const DEFAULT_VALUE: DefaultValue = {
  tuKhoa: ''
}

function Search() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queryParams: Partial<Pagination & SearchParams> = useQueryParams()

  const { tuKhoa = DEFAULT_VALUE.tuKhoa } = queryParams

  const formMethods = useForm({
    defaultValues: { tuKhoa }
  })
  const { handleSubmit, reset } = formMethods

  const onCancel = useCallback(() => {
    reset(DEFAULT_VALUE)
    navigate({
      pathname,
      search: QueryString.stringify({ ...queryParams, ...DEFAULT_VALUE })
    })
  }, [pathname, queryParams, navigate, reset])

  const onSearch = useCallback((formData: DefaultValue) => {
    navigate({
      pathname,
      search: QueryString.stringify({ ...queryParams, ...formData })
    })
  }, [pathname, queryParams, navigate])

  return (
    <SearchBox onCancel={onCancel} onSearch={handleSubmit(onSearch)}>
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSearch)}>
          <Grid container spacing={2}>
            <Grid item flex={1}>
              <FormInput name="tuKhoa" textFieldProps={{ label: 'Keyword' }} />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </SearchBox>
  )
}

export default Search
