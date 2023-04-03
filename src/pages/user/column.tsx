import { GridColDef } from '@mui/x-data-grid'

export const columns: GridColDef[] = [
  { field: 'taiKhoan', headerName: 'Username', width: 150 },
  { field: 'hoTen', headerName: 'Full name', width: 150 },
  {
    field: 'soDT',
    headerName: 'Phone number',
    width: 150
  },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'maNhom',
    headerName: 'Group code',
    width: 150
  },
  {
    field: 'maLoaiNguoiDung',
    headerName: 'Member type',
    sortable: false,
    width: 160
  },
  {
    field: 'tenLoaiNguoiDung',
    headerName: 'Member type name',
    sortable: false,
    width: 160
  }
]
