import { yupResolver } from '@hookform/resolvers/yup'
import { LoadingButton } from '@mui/lab'
import { Button, Grid } from '@mui/material'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { DialogComponent, FormInput, FormSelect } from 'components'
import { GROUP_CODE, QUERY_KEY, Storage } from 'constant'
import dayjs from 'dayjs'
import { CourseToCreate, ICourse } from 'models'
import {
  memo, useCallback, useEffect, useMemo, useState
} from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { getCourseCategoryApi, updateCourseApi } from 'services'
import { getCurrentDate } from 'utils'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import { editCourseSchema } from './schema'

interface Props {
  open: boolean
  onClose: () => void,
  courseToEdit: ICourse | Record<string, never>
}

interface UserLogin {
  accessToken: string
  email: string
  hoTen: string
  maLoaiNguoiDung: string
  maNhom: string
  soDT: string
  taiKhoan: string
}

let userLogin: UserLogin

if (localStorage.getItem(Storage.USER_LOGIN)) {
  userLogin = JSON.parse(localStorage.getItem(Storage.USER_LOGIN) || '{}')
}

const DEFAULT_VALUES: CourseToCreate = {
  maKhoaHoc: '',
  biDanh: '',
  tenKhoaHoc: '',
  moTa: '',
  luotXem: 0,
  danhGia: 0,
  hinhAnh: '',
  maNhom: GROUP_CODE,
  ngayTao: dayjs(getCurrentDate()).format('DD/MM/YYYY'),
  maDanhMucKhoaHoc: '',
  taiKhoanNguoiTao: ''
}

function EditCourseModal({ open, onClose, courseToEdit }: Props) {
  const queryClient = useQueryClient()

  const [img, setImg] = useState<string>('')

  const { mutate, isLoading } = useMutation({
    mutationFn: (data: CourseToCreate) => updateCourseApi(data)
  })

  const formMethods = useForm({
    defaultValues: DEFAULT_VALUES,
    resolver: yupResolver(editCourseSchema)
  })
  const { handleSubmit, reset } = formMethods

  useEffect(() => {
    if (Object.keys(courseToEdit).length) {
      const {
        danhMucKhoaHoc, nguoiTao, soLuongHocVien, ...newCourseToEdit
      } = courseToEdit
      reset({ ...newCourseToEdit, maDanhMucKhoaHoc: danhMucKhoaHoc.maDanhMucKhoahoc })
    }
  }, [courseToEdit, reset])

  const onSubmit = useCallback((formData: CourseToCreate) => {
    const newFormData = { ...formData, hinhAnh: img, taiKhoanNguoiTao: userLogin.taiKhoan }
    mutate(newFormData, {
      onSuccess: () => {
        toast.success('Update course successfully!')
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.COURSES] })
        onClose()
        reset(DEFAULT_VALUES)
      }
    })
  }, [mutate, onClose, queryClient, reset, img])

  const courseCateQuery = useQuery({
    queryKey: [QUERY_KEY.COURSE_CATE],
    queryFn: () => getCourseCategoryApi()
  })

  const courseCateOption = useMemo(
    () => (courseCateQuery.data || []).map((cate) => ({
      value: cate.maDanhMuc,
      label: cate.tenDanhMuc
    })),
    [courseCateQuery.data]
  )

  const actions = useMemo(() => (
    <>
      <Button onClick={onClose}>Cancel</Button>
      <LoadingButton loading={isLoading} onClick={handleSubmit(onSubmit)}>Update</LoadingButton>
    </>
  ), [handleSubmit, onSubmit, onClose, isLoading])

  const handleOnChangeFile = (e: { target: HTMLInputElement }) => {
    if (e.target.files) {
      const file = e.target.files[0]
      setImg(URL.createObjectURL(file))
    }
  }
  return (
    <DialogComponent
      dialogProps={{ open, onClose }}
      title="Edit course"
      actions={actions}
    >
      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <FormInput name="maKhoaHoc" textFieldProps={{ label: 'Course code' }} />
            </Grid>
            <Grid item xs={6}>
              <FormInput name="tenKhoaHoc" textFieldProps={{ label: 'Course name' }} />
            </Grid>
            <Grid item xs={6}>
              <FormInput name="biDanh" textFieldProps={{ label: 'Aliases' }} />
            </Grid>
            <Grid item xs={6}>
              <FormSelect name="maDanhMucKhoaHoc" options={courseCateOption} textFieldProps={{ label: 'Course category' }} />
            </Grid>
            <Grid item xs={6}>
              <Button
                variant="contained"
                component="label"
              >
                <FileUploadOutlinedIcon />
                {' '}
                Upload image
                <input
                  onChange={handleOnChangeFile}
                  type="file"
                  name="hinhAnh"
                  hidden
                />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <img src={img || courseToEdit.hinhAnh} alt="" width="100%" />
            </Grid>
            <Grid item xs={6}>
              <FormInput name="moTa" textFieldProps={{ label: 'Description' }} />
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </DialogComponent>
  )
}

export default memo(EditCourseModal)
