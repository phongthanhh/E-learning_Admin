/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@mui/material'
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import { useQuery } from '@tanstack/react-query'
import { GROUP_CODE } from 'constant'
import {
  ISearchParams, IUserToCreate, IUserToEdit
} from 'models'
import React, { ReactNode } from 'react'

interface IParams {
  handleSetUserToEdit:(userEdit:IUserToEdit)=>void
}

export default function columns({ handleSetUserToEdit }:IParams):GridColDef[] {
  return (
    [
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
        field: 'tenLoaiNguoiDung',
        headerName: 'Member type',
        sortable: false,
        width: 160
      },
      {
        field: '',
        headerName: 'Action',
        width: 160,
        renderCell: (params: GridRenderCellParams):ReactNode => (
          <>
            <Button onClick={() => {
              handleSetUserToEdit(params.row)
            }}
            >
              Edit
            </Button>
            <Button>DEL</Button>
          </>
        )
      }
    ]
  )
}
