import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid'
import React, { ReactNode } from 'react'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import styled from 'styled-components'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import { COLORS } from 'themes'
import { CourseQuery } from 'models'
import Swal from 'sweetalert2'

export const StyledButton = styled.div`
  .edit{
    color:${COLORS.green}
  }
  .del{
    color:${COLORS.red}
  }
`

interface Params {
  handleGetCourseToEdit: (courseParams: CourseQuery) => void,
  handleDelCourse: (courseParams: CourseQuery) => void
}

export default function columns({ handleGetCourseToEdit, handleDelCourse }: Params): GridColDef[] {
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
            <Tooltip title="Edit">
              <IconButton>
                <EditOutlinedIcon
                  className="edit"
                  onClick={() => {
                    handleGetCourseToEdit({ maKhoaHoc: params.row.maKhoaHoc })
                  }}
                />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton>
                <DeleteOutlineOutlinedIcon
                  className="del"
                  onClick={() => {
                    Swal.fire({
                      title: 'Do you want to delete?',
                      text: "You won't be able to revert this!",
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#3085d6',
                      cancelButtonColor: '#d33',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        handleDelCourse({ maKhoaHoc: params.row.maKhoaHoc })
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
