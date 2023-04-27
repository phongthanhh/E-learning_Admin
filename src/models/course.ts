export interface ICourse {
  maKhoaHoc: string,
  biDanh: string,
  tenKhoaHoc: string,
  moTa: string,
  luotXem: number,
  hinhAnh: string,
  maNhom: null | string,
  ngayTao: string,
  soLuongHocVien: number,
  nguoiTao: {
    taiKhoan: string,
    hoTen: string,
    maLoaiNguoiDung: string,
    tenLoaiNguoiDung: string
  },
  danhMucKhoaHoc: {
    maDanhMucKhoahoc: string,
    tenDanhMucKhoaHoc: string
  }
}

export interface CourseToCreate {
  maKhoaHoc: string,
  biDanh: string,
  tenKhoaHoc: string,
  moTa: string,
  luotXem: number,
  danhGia: number,
  hinhAnh: string,
  maNhom: null | string,
  ngayTao: string,
  maDanhMucKhoaHoc: string,
  taiKhoanNguoiTao: string,
}

export interface CourseCategory {
  maDanhMuc: string
  tenDanhMuc: string
}

export interface CourseQuery {
  maKhoaHoc: string
}

export interface RegisterCourse extends CourseQuery {
  taiKhoan: string
}
