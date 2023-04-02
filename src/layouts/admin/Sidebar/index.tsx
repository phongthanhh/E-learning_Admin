import { uid } from 'utils'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { memo } from 'react'

const MENU = [
  { id: uid(), icon: ManageAccountsOutlinedIcon, name: 'Quản lý người dùng' },
  { id: uid(), icon: LibraryBooksOutlinedIcon, name: 'Quản lý khóa học' },
  { id: uid(), icon: AppRegistrationOutlinedIcon, name: 'Ghi danh' }
]

function Sidebar() {
  return (
    <>
      {MENU.map((menu) => (
        <ListItemButton key={menu.id}>
          <ListItemIcon>
            <menu.icon />
          </ListItemIcon>
          <ListItemText primary={menu.name} />
        </ListItemButton>
      ))}
    </>
  )
}

export default memo(Sidebar)
