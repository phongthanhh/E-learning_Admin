export interface User {
  taiKhoan: string,
  hoTen: string,
  soDT: string,
  maNhom: null | string,
  email: string,
  maLoaiNguoiDung: string,
  tenLoaiNguoiDung: string
}

export interface Admin extends Omit<User, 'tenLoaiNguoiDung'> {
  matKhau: string,
  authenticated: boolean
}

export interface UserToCreate extends Omit<User, 'tenLoaiNguoiDung'> {
  matKhau: string
}

export interface UserToEdit extends UserToCreate {
  xacNhanMatKhau: string,
}

export interface MemberType {
  maLoaiNguoiDung: string
  tenLoaiNguoiDung: string
}

export interface UserRegister {
  taiKhoan: string,
  hoTen: string,
  biDanh: string
}

export interface UserNameQuery {
  taiKhoan: string
}
