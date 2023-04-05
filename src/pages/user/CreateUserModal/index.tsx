import { yupResolver } from '@hookform/resolvers/yup'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, Slide, Grid
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useQuery } from '@tanstack/react-query'
import { FormInput, FormSelect } from 'components'
import { GROUP_CODE } from 'constant'
import { GROUPS } from 'data'
import { IOption } from 'models'
import {
  ReactElement, memo, useMemo
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { getMemberTypesApi } from 'services'
import { createUserSchema } from './schema'

interface IProps {
  open: boolean
  onCloseCreateUserModal: () => void
}

interface IUserToCreate {
  taiKhoan: string,
  matKhau: string,
  hoTen: string,
  soDT: string,
  maLoaiNguoiDung: string,
  maNhom: IOption | string,
  email: string
}

const GROUP_OPTIONS = GROUPS.map((group) => ({ value: group, label: group }))

const DEFAULT_VALUES: IUserToCreate = {
  taiKhoan: '',
  matKhau: '',
  hoTen: '',
  soDT: '',
  maLoaiNguoiDung: '',
  maNhom: GROUP_CODE,
  email: ''
}

function Transition(props: TransitionProps & { children: ReactElement }) {
  return <Slide direction="up" {...props} />
}

function CreateUserModal(props: IProps) {
  const { open, onCloseCreateUserModal } = props
  const formMethods = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(createUserSchema)
  })

  const { handleSubmit } = formMethods
  const onSubmit = (formData: IUserToCreate) => {
    // eslint-disable-next-line no-console
    console.log('Tai Vo 🚀 ~ formData:', formData)
  }

  const memberTypesQuery = useQuery({
    queryKey: ['memberTypes'],
    queryFn: () => getMemberTypesApi()
  })

  const memberTypeOptions = useMemo(
    () => (memberTypesQuery.data || []).map((memberType) => ({
      value: memberType.maLoaiNguoiDung,
      label: memberType.tenLoaiNguoiDung
    })),
    [memberTypesQuery.data]
  )

  return (
    <Dialog
      open={open}
      onClose={onCloseCreateUserModal}
      TransitionComponent={Transition}
    >
      <DialogTitle>Create user</DialogTitle>
      <DialogContent>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormInput name="taiKhoan" textFieldProps={{ label: 'Username' }} />
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
              <Grid item xs={6}>
                <FormSelect name="maNhom" options={GROUP_OPTIONS} textFieldProps={{ label: 'Group code' }} />
              </Grid>
            </Grid>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseCreateUserModal}>Cancel</Button>
        <Button onClick={handleSubmit(onSubmit)}>Create</Button>
      </DialogActions>
    </Dialog>
  )
}

export default memo(CreateUserModal)
