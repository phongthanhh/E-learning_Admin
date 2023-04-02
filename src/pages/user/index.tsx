/* eslint-disable @typescript-eslint/no-magic-numbers */
import * as React from 'react'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { Paper, Button } from '@mui/material'

const columns: GridColDef[] = [
  { field: 'taiKhoan', headerName: 'Tài Khoản', width: 150 },
  { field: 'hoTen', headerName: 'Họ Tên', width: 150 },
  { field: 'email', headerName: 'Email', width: 200 },
  {
    field: 'soDT',
    headerName: 'Số điện thoại',
    type: 'number',
    width: 150
  },
  {
    field: 'loaiNguoiDung',
    headerName: 'Loại người dùng',
    sortable: false,
    width: 160
  }
]

const rows = [
  {
    id: 1, lastName: 'Snow', firstName: 'Jon', age: 35
  },
  {
    id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42
  },
  {
    id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45
  },
  {
    id: 4, lastName: 'Stark', firstName: 'Arya', age: 16
  },
  {
    id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null
  },
  {
    id: 6, lastName: 'Melisandre', firstName: null, age: 150
  },
  {
    id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44
  },
  {
    id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36
  },
  {
    id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65
  }
]

export default function User() {
  return (
    <Paper
      sx={{
        p: 2
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <Button variant="contained" color="success"> Thêm khóa học</Button>
      </div>

      <div style={{ height: 500, width: '100%' }}>
        <DataGrid
          rows={rows}
          columns={columns}
        />
      </div>
    </Paper>
  )
}
