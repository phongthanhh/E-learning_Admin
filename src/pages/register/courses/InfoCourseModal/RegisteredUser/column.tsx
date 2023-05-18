import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import styled from 'styled-components'
import { COLORS } from 'themes'
import React, { ReactNode } from 'react'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'
import { CourseQuery, RegisterCourse } from 'models'
import Swal from 'sweetalert2'
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

interface Props {
  handleUnRegisterCourse: (data: RegisterCourse) => void
}
let courseCode: CourseQuery

export default function columns({ handleUnRegisterCourse }: Props): GridColDef[] {
  if (localStorage.getItem(Storage.COURSE_CODE)) {
    courseCode = JSON.parse(localStorage.getItem(Storage.COURSE_CODE) || '{}')
  }
  return (
    [
      { field: 'taiKhoan', headerName: 'User name', width: 170 },
      { field: 'hoTen', headerName: 'Full Name', width: 170 },
      {
        field: '',
        headerName: 'Action',
        width: 100,
        align: 'center',
        renderCell: (params: GridRenderCellParams): ReactNode => (
          <StyledButton>
            <Tooltip title="Unregister">
              <IconButton>
                <RemoveCircleOutlineOutlinedIcon
                  className="del"
                  onClick={() => {
                    Swal.fire({
                      title: 'Do you want to cancel registration?',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, do it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleUnRegisterCourse(
                          { maKhoaHoc: courseCode.maKhoaHoc, taiKhoan: params.row.taiKhoan }
                        )
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
