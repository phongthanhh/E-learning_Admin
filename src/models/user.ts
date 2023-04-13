export interface IUser {
  taiKhoan: string,
  hoTen: string,
  soDT: string,
  maNhom: null | string,
  email: string,
  maLoaiNguoiDung: string,
  tenLoaiNguoiDung: string
}

export interface IUserToCreate extends Omit<IUser, 'tenLoaiNguoiDung'> {
  matKhau: string
}

export interface IUserToEdit extends IUserToCreate {
  xacNhanMatKhau: string,
}

export interface IMemberType {
  maLoaiNguoiDung: string
  tenLoaiNguoiDung: string
}
