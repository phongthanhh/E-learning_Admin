import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import styled from 'styled-components'
import React, { ReactNode } from 'react'
import { COLORS } from 'themes'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined'
import Swal from 'sweetalert2'

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
interface Props {
  handleApproveCourse: (courseCode: string) => void
}

export default function columns({ handleApproveCourse }: Props): GridColDef[] {
  return (
    [
      { field: 'maKhoaHoc', headerName: 'Course code', width: 170 },
      { field: 'tenKhoaHoc', headerName: 'Course name', width: 170 },
      {
        field: '',
        headerName: 'Action',
        width: 100,
        align: 'center',
        renderCell: (params: GridRenderCellParams): ReactNode => (
          <StyledButton>
            <Tooltip title="Approve">
              <IconButton>
                <DoneOutlineOutlinedIcon
                  className="edit"
                  onClick={() => {
                    Swal.fire({
                      title: 'Do you want to register?',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, do it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleApproveCourse(params.row.maKhoaHoc)
                      }
                    })
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
