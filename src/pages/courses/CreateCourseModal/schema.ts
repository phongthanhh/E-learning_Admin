import * as yup from 'yup'

export const createCourseSchema = yup.object().shape({
  maKhoaHoc: yup.string().required('Course code is required.'),
  biDanh: yup.string().required('Aliases is required.'),
  moTa: yup.string().required('Description is required.'),
  tenKhoaHoc: yup.string().required('Course name is required.'),
  maDanhMucKhoaHoc: yup.string().required('Course category is required.')
})
