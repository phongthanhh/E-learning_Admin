import { Grid } from '@mui/material'
import { FormInput, SearchBox } from 'components'
import { useQueryParams } from 'hooks'
import { Pagination, SearchParams } from 'models'
import { useCallback } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useLocation, useNavigate } from 'react-router'
import QueryString from 'query-string'

interface DefaultValue {
  tenKhoaHoc: Required<SearchParams>['tenKhoaHoc']
}

const DEFAULT_VALUE: DefaultValue = {
  tenKhoaHoc: ''
}

function Search() {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const queryParams: Partial<Pagination & SearchParams> = useQueryParams()

  const { tenKhoaHoc = DEFAULT_VALUE.tenKhoaHoc } = queryParams

  const formMethods = useForm({
    defaultValues: { tenKhoaHoc }
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
              <FormInput name="tenKhoaHoc" textFieldProps={{ label: 'Keyword' }} />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </SearchBox>
  )
}

export default Search
