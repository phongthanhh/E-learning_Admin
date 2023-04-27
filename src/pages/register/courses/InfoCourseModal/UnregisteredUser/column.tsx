import { GridColDef } from '@mui/x-data-grid'
import styled from 'styled-components'
import { COLORS } from 'themes'

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

export default function columns(): GridColDef[] {
  return (
    [
      { field: 'taiKhoan', headerName: 'User name', width: 200 },
      { field: 'hoTen', headerName: 'Full Name', width: 200 }
    ]
  )
}
