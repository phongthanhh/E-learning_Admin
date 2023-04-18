import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Grid
} from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DialogComponent, FormInput, FormSelect } from 'components'
import { GROUP_CODE, QUERY_KEY } from 'constant'
import { UserToCreate, UserToEdit } from 'models'
import {
  memo, useMemo, useEffect, useCallback
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getMemberTypesApi, updateUserApi } from 'services'
import { createUserSchema } from './schema'

interface Props {
  open: boolean
  onClose: () => void,
  userToEdit: UserToEdit | Record<string, never>
}

const DEFAULT_VALUES: UserToEdit = {
  taiKhoan: '',
  matKhau: '',
  hoTen: '',
  soDT: '',
  maLoaiNguoiDung: '',
  maNhom: GROUP_CODE,
  email: '',
  xacNhanMatKhau: ''
}

function EditModal(props: Props) {
  const { open, onClose, userToEdit } = props

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: UserToCreate) => updateUserApi(data)
  })

  const formMethods = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(createUserSchema)
  })

  const {
    handleSubmit, reset
  } = formMethods

  useEffect(() => {
    if (Object.keys(userToEdit).length) {
      const newUserToEdit = { ...userToEdit, maNhom: GROUP_CODE }
      reset(newUserToEdit)
    }
  }, [userToEdit, reset])

  const onSubmit = useCallback((formData: UserToEdit) => {
    const {
      xacNhanMatKhau, ...newFormData
    } = formData
    mutate(newFormData, {
      onSuccess: () => {
        toast.success('Update user successfully!')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] })
        onClose()
        reset(DEFAULT_VALUES)
      }
    })
  }, [mutate, onClose, queryClient, reset])

  const memberTypesQuery = useQuery({
    queryKey: [QUERY_KEY.MEMBER_TYPES],
    queryFn: () => getMemberTypesApi()
  })

  const memberTypeOptions = useMemo(
    () => (memberTypesQuery.data || []).map((memberType) => ({
      value: memberType.maLoaiNguoiDung,
      label: memberType.tenLoaiNguoiDung
    })),
    [memberTypesQuery.data]
  )

  const actions = useMemo(() => (
    <>
      <Button onClick={onClose}>Cancel</Button>
      <LoadingButton loading={isLoading} onClick={handleSubmit(onSubmit)}>Update</LoadingButton>
    </>
  ), [handleSubmit, onSubmit, onClose, isLoading])

  return (
    <DialogComponent
      dialogProps={{ open, onClose }}
      title="Edit user"
      actions={actions}
    >
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormInput name="taiKhoan" textFieldProps={{ label: 'Username', disabled: true }} />
            </Grid>
            <Grid item xs={6}>
              <FormInput name="hoTen" textFieldProps={{ label: 'Full name' }} />
            </Grid>
            <Grid item xs={6}>
              <FormInput name="matKhau" textFieldProps={{ label: 'Password', type: 'password' }} />
            </Grid>
            <Grid item xs={6}>
              <FormInput name="xacNhanMatKhau" textFieldProps={{ label: 'Confirm password', type: 'password' }} />
            </Grid>
            <Grid item xs={6}>
              <FormInput name="email" textFieldProps={{ label: 'Email' }} />
            </Grid>
            <Grid item xs={6}>
              <FormInput name="soDT" textFieldProps={{ label: 'Phone number' }} />
            </Grid>
            <Grid item xs={6}>
              <FormSelect name="maLoaiNguoiDung" options={memberTypeOptions} textFieldProps={{ label: 'Member type' }} />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </DialogComponent>
  )
}

export default memo(EditModal)
