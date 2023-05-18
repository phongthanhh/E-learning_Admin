import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { COLORS } from 'themes'
import TroubleshootOutlinedIcon from '@mui/icons-material/TroubleshootOutlined'
import { UserNameQuery } from 'models'

export const StyledButton = styled.div`
  .edit{
    color:${COLORS.green}
  }
  .del{
    color:${COLORS.red}
  }
`

interface Params {
  handleSetUserName: (params: UserNameQuery) => void,
}

export default function columns({ handleSetUserName }: Params): GridColDef[] {
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
            <Tooltip title="See list">
              <IconButton>
                <TroubleshootOutlinedIcon
                  className="edit"
                  onClick={() => {
                    handleSetUserName({ taiKhoan: params.row.taiKhoan })
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
