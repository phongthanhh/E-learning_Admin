import { uid } from 'utils'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import AppRegistrationOutlinedIcon from '@mui/icons-material/AppRegistrationOutlined'
import {
  Collapse, List, ListItemButton, ListItemIcon, ListItemText
} from '@mui/material'
import { memo, useState } from 'react'
import { useNavigate } from 'react-router'
import ExpandLess from '@mui/icons-material/ExpandLess'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { ROUTES_NAME } from 'constant'

const MENU = [
  {
    id: uid(), icon: HomeOutlinedIcon, name: 'Home', path: ROUTES_NAME.ADMIN
  },
  {
    id: uid(), icon: ManageAccountsOutlinedIcon, name: 'User management', path: ROUTES_NAME.USERS
  },
  {
    id: uid(), icon: LibraryBooksOutlinedIcon, name: 'Course management', path: ROUTES_NAME.COURSE
  },
  {
    id: uid(),
    icon: AppRegistrationOutlinedIcon,
    name: 'Register',
    path: ROUTES_NAME.REGISTER,
    childItem: [{
      id: uid(), icon: TurnedInNotRoundedIcon, name: 'By course', path: ROUTES_NAME.COURSE_REGISTER
    },
    {
      id: uid(), icon: AssignmentIndOutlinedIcon, name: 'By user', path: ROUTES_NAME.USERS_REGISTER
    }
    ]
  }
]

function Sidebar() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!open)
  }
  return (
    <>
      {MENU.map((menu) => {
        if (menu.path === ROUTES_NAME.REGISTER) {
          return (
            <>
              <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                  <menu.icon />
                </ListItemIcon>
                <ListItemText primary={menu.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {menu.childItem?.map((item) => (
                    <ListItemButton
                      key={item.id}
                      sx={{ pl: 3 }}
                      onClick={() => navigate(item.path)}
                    >
                      <ListItemIcon>
                        <item.icon />
                      </ListItemIcon>
                      <ListItemText primary={item.name} />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            </>
          )
        }
        return (
          <ListItemButton key={menu.id} onClick={() => navigate(menu.path)}>
            <ListItemIcon>
              <menu.icon />
            </ListItemIcon>
            <ListItemText primary={menu.name} />
          </ListItemButton>
        )
      })}
    </>
  )
}

export default memo(Sidebar)
