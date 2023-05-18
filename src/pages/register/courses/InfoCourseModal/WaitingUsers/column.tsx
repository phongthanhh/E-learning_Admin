import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import styled from 'styled-components'
import React, { ReactNode } from 'react'
import { COLORS } from 'themes'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import DoneOutlineOutlinedIcon from '@mui/icons-material/DoneOutlineOutlined'
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
  handleRegisterCourse: (data: RegisterCourse) => void
}
let courseCode: CourseQuery

export default function columns({ handleRegisterCourse }: Props): GridColDef[] {
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
                        handleRegisterCourse(
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
