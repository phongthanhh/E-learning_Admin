import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { ReactNode } from 'react'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { COLORS } from 'themes'
import QueryStatsOutlinedIcon from '@mui/icons-material/QueryStatsOutlined'
import { Storage } from 'constant'

export const StyledButton = styled.div`
  .edit{
    color:${COLORS.green}
  }
  .del{
    color:${COLORS.red}
  }
  .pending{
    color:${COLORS.yellow}
  }
`

interface Params {
  onOpenInfoCourseModal: () => void
}

export default function columns(
  { onOpenInfoCourseModal }: Params
): GridColDef[] {
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
        renderCell: (params: GridRenderCellParams): ReactNode => (
          <StyledButton>
            <Tooltip title="See list">
              <IconButton>
                <QueryStatsOutlinedIcon
                  className="edit"
                  onClick={() => {
                    localStorage.setItem(
                      Storage.COURSE_CODE,
                      JSON.stringify({ maKhoaHoc: params.row.maKhoaHoc })
                    )
                    onOpenInfoCourseModal()
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
