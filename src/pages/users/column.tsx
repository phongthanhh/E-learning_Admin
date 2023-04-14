import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import {
  UserNameParams,
  UserToEdit
} from 'models'
import React, { ReactNode } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { COLORS } from 'themes'

export const StyledButton = styled.div`
  .edit{
    color:${COLORS.green}
  }
  .del{
    color:${COLORS.red}
  }
`

interface Params {
  handleSetUserToEdit: (userEdit: UserToEdit) => void,
  handleDelUser: (userNameQuery: UserNameParams) => void
}

export default function columns({ handleSetUserToEdit, handleDelUser }: Params): GridColDef[] {
  return (
    [
      { field: 'taiKhoan', headerName: 'Username', width: 200 },
      { field: 'hoTen', headerName: 'Full name', width: 200 },
      {
        field: 'soDT',
        headerName: 'Phone number',
        width: 200
      },
      { field: 'email', headerName: 'Email', width: 250 },
      {
        field: 'tenLoaiNguoiDung',
        headerName: 'Member type',
        sortable: false,
        width: 150
      },
      {
        field: '',
        headerName: 'Action',
        width: 100,
        align: 'center',
        renderCell: (params: GridRenderCellParams): ReactNode => (
          <StyledButton>
            <Tooltip title="Edit">
              <IconButton>
                <EditOutlinedIcon
                  className="edit"
                  onClick={() => {
                    const { tenLoaiNguoiDung, id, ...newParams } = params.row
                    handleSetUserToEdit(newParams)
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton>
                <DeleteOutlineOutlinedIcon
                  className="del"
                  onClick={() => {
                    handleDelUser({ TaiKhoan: params.row.taiKhoan })
                  }}
                />
              </IconButton>
            </Tooltip>
          </StyledButton>
        )
      }
    ]
  )
}
