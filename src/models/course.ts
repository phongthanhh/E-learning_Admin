export interface Course {
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
