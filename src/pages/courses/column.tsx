import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import {
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

export default function columns(): GridColDef[] {
  return (
    [
      { field: 'maKhoaHoc', headerName: 'Course type', width: 200 },
      { field: 'tenKhoaHoc', headerName: 'Course name', width: 200 },
      {
        field: 'moTa',
        headerName: 'Description',
        width: 270
      },
      {
        field: 'hinhAnh',
        headerName: 'Image',
        width: 150,
        renderCell: (params: GridRenderCellParams): ReactNode => (
          <div>
            <img src={params.row.hinhAnh} alt="" width={60} />
          </div>
        ),
        align: 'center'
      },
      {
        field: 'nguoiTao.',
        headerName: 'Creator',
        sortable: false,
        width: 180,
        renderCell: (params: GridRenderCellParams): ReactNode => (
          <div>
            <p>{params.row.nguoiTao.hoTen}</p>
          </div>
        )
      },
      {
        field: '',
        headerName: 'Action',
        width: 100,
        align: 'center',
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        renderCell: (params: GridRenderCellParams): ReactNode => (
          <StyledButton>
            <Tooltip title="Edit">
              <IconButton>
                <EditOutlinedIcon
                  className="edit"

                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton>
                <DeleteOutlineOutlinedIcon
                  className="del"
                />
              </IconButton>
            </Tooltip>
          </StyledButton>
        )
      }
    ]
  )
}
