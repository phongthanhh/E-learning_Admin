import * as React from 'react'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'

export const mainListItems = (
  <>
    <ListItemButton>
      <ListItemIcon>
        <ManageAccountsOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý người dùng" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LibraryBooksOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Quản lý khóa học" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AppRegistrationOutlinedIcon />
      </ListItemIcon>
      <ListItemText primary="Ghi danh" />
    </ListItemButton>
  </>
)
