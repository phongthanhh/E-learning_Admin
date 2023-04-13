/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { IUserToCreate, IUserToEdit } from 'models'
import {
  ReactElement, forwardRef, memo, useMemo, useEffect
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { createUserApi, getMemberTypesApi, updateUserApi } from 'services'
import { createUserSchema } from './schema'

interface IProps {
  open: boolean
  onCloseEditModal: () => void,
  userToEdit:IUserToEdit | Record<string, never>
}

const DEFAULT_VALUES: IUserToEdit = {
  taiKhoan: '',
  matKhau: '',
  hoTen: '',
  soDT: '',
  maLoaiNguoiDung: '',
  maNhom: GROUP_CODE,
  email: '',
  xacNhanMatKhau: '',
  id: '',
  tenLoaiNguoiDung: ''
}

// eslint-disable-next-line react/display-name
const Transition = forwardRef((props: TransitionProps & { children: ReactElement }, ref: React.Ref<unknown>) => (<Slide direction="up" ref={ref} {...props} />))

function EditModal(props: IProps) {
  const { open, onCloseEditModal, userToEdit } = props

  const queryClient = useQueryClient()

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: IUserToCreate) => updateUserApi(data)
  })

  const formMethods = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(createUserSchema)
  })

  const {
    handleSubmit, reset, formState: { errors }
  } = formMethods

  useEffect(() => {
    if (Object.keys(userToEdit).length) {
      const newUserToEdit = { ...userToEdit, maNhom: GROUP_CODE }
      reset(newUserToEdit)
    }
  }, [userToEdit, reset])

  const onSubmit = (formData: IUserToEdit) => {
    const {
      xacNhanMatKhau, tenLoaiNguoiDung, id, ...newFormData
    } = formData
    mutate(newFormData, {
      onSuccess: () => {
        toast.success('Update user successfully!')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.USERS] })
        onCloseEditModal()
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
      onClose={onCloseEditModal}
      TransitionComponent={Transition}
    >
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <FormProvider {...formMethods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <FormInput disabled name="taiKhoan" textFieldProps={{ label: 'Username' }} />
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
        <Button variant="contained" color="error" onClick={onCloseEditModal}>Cancel</Button>
        <LoadingButton variant="contained" color="success" loading={isLoading} onClick={handleSubmit(onSubmit)}>Update</LoadingButton>
      </DialogActions>
    </Dialog>
  )
}

export default memo(EditModal)
