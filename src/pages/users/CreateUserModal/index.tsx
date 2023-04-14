import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog, DialogActions, DialogContent, DialogTitle,
  Grid,
  Slide
} from '@mui/material'
import { TransitionProps } from '@mui/material/transitions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { FormInput, FormSelect } from 'components'
import { GROUP_CODE, QUERY_KEY } from 'constant'
import { UserToCreate } from 'models'
import {
  ReactElement, forwardRef, memo, useMemo
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createUserApi, getMemberTypesApi } from 'services'
import { createUserSchema } from './schema'

interface Props {
  open: boolean
  onCloseCreateUserModal: () => void
}

const DEFAULT_VALUES: UserToCreate = {
  taiKhoan: '',
  matKhau: '',
  hoTen: '',
  soDT: '',
  maLoaiNguoiDung: '',
  maNhom: GROUP_CODE,
  email: ''
}

// eslint-disable-next-line react/display-name
const Transition = forwardRef((props: TransitionProps & { children: ReactElement }, ref: React.Ref<unknown>) => (<Slide direction="up" ref={ref} {...props} />))

function CreateUserModal(props: Props) {
  const { open, onCloseCreateUserModal } = props

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: UserToCreate) => createUserApi(data)
  })

  const formMethods = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(createUserSchema)
  })
  const { handleSubmit, reset } = formMethods

  const onSubmit = (formData: UserToCreate) => {
    mutate(formData, {
      onSuccess: () => {
        toast.success('Create user successfully!')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] })
        onCloseCreateUserModal()
        reset(DEFAULT_VALUES)
      }
    })
  }

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
            </Grid>
          </form>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCloseCreateUserModal}>Cancel</Button>
        <LoadingButton loading={isLoading} onClick={handleSubmit(onSubmit)}>Create</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default memo(CreateUserModal)
