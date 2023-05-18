import * as React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import MenuIcon from '@mui/icons-material/Menu'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import { Outlet, useLocation, useNavigate } from 'react-router'
import { QUERY_KEY, ROUTES_NAME, USER_URL } from 'constant'
import { useQueryClient } from '@tanstack/react-query'
import Tooltip from '@mui/material/Tooltip'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { Admin } from 'models'
import { uid } from 'utils'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import { SvgIconTypeMap } from '@mui/material/SvgIcon'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined'
import TurnedInNotRoundedIcon from '@mui/icons-material/TurnedInNotRounded'
import Sidebar from './Sidebar'
import {
  AppBar, Drawer, InfoStyled, StyledTitleWrapper
} from './styled'

const renderTitle = ({ name, icon: Icon }:
{ name: string, icon: OverridableComponent<SvgIconTypeMap<object, 'svg'>> & { muiName: string; } }) => (
  <StyledTitleWrapper>
    <Icon />
    <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
    >
      {name}
    </Typography>
  </StyledTitleWrapper>

)

const titleMapping = {
  [ROUTES_NAME.ROOT]: renderTitle({ name: 'Home', icon: HomeOutlinedIcon }),
  [ROUTES_NAME.USERS]: renderTitle({ name: 'User management', icon: ManageAccountsOutlinedIcon }),
  [ROUTES_NAME.COURSE]: renderTitle({ name: 'Course management', icon: LibraryBooksOutlinedIcon }),
  [ROUTES_NAME.COURSE_REGISTER]: renderTitle({ name: 'Register by course', icon: TurnedInNotRoundedIcon }),
  [ROUTES_NAME.USERS_REGISTER]: renderTitle({ name: 'Register by user', icon: AssignmentIndOutlinedIcon })
}

const mdTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#1976d2'
    }
  }
})

function AdminLayout() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const [open, setOpen] = React.useState(true)

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  const toggleDrawer = () => {
    setOpen(!open)
  }
  const redirectToUserPage = React.useCallback(() => {
    window.location.replace(`${USER_URL}`)
  }, [])

  const settings = React.useMemo(() => [
    {
      id: uid(),
      name: 'User page',
      onClick: redirectToUserPage
    },
    {
      id: uid(),
      name: 'Sign out',
      onClick: () => navigate(ROUTES_NAME.REQUEST_SIGN_OUT)
    }
  ], [redirectToUserPage, navigate])

  const queryClient = useQueryClient()

  const adminInfo: Admin | undefined = queryClient.getQueryData([QUERY_KEY.ADMIN_INFO])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px' // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' })
              }}
            >
              <MenuIcon />
            </IconButton>
            {titleMapping[pathname]}

            <Box sx={{ flexGrow: 0 }}>
              <InfoStyled>
                <Typography>{adminInfo?.hoTen}</Typography>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/150?u=63453463" />
                  </IconButton>
                </Tooltip>
              </InfoStyled>

              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right'
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem
                    key={setting.id}
                    onClick={setting.onClick}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>

            </Box>

            {/* <IconButton color="inherit" onClick={redirectToUserPage}>
              <Badge color="secondary">
                <HomeIcon />
                Home
              </Badge>
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <Sidebar />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) => (theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900]),
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Outlet />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default AdminLayout
