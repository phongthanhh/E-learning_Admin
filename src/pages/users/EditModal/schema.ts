import * as yup from 'yup'

export const createUserSchema = yup.object().shape({
  taiKhoan: yup.string().required('Username is required.'),
  matKhau: yup.string(),
  xacNhanMatKhau: yup.string().oneOf([yup.ref('matKhau'), ''], 'Passwords must match'),
  email: yup.string().required('Email is required.').email('Email is not valid.'),
  hoTen: yup.string().required('Full name is required.'),
  soDT: yup.string().required('Phone number is required.'),
  maLoaiNguoiDung: yup.string().required('Member type is required.')
})
