import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  AppBar,
  Button,
  Toolbar,
  Switch,
  useTheme,
  useMediaQuery
} from '@mui/material'
import HamburgerMenu from './HamburgerMenu'
import ContrastIcon from '@mui/icons-material/Contrast'

const Navbar = (props) => {

  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const user = useSelector(state => state.user)

  return (
    <AppBar maxWidth={false} color="inherit" sx={{ width: '100%', /*backgroundColor: 'white',*/ color: '#1976d2' }} >
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          { isMobile ?
            <HamburgerMenu handleLogout={props.handleLogout}/>
            :
            <>
              <Button color="inherit" component={Link} to="/">
              home
              </Button>
              {user === null ? (
                <>
                  <Button color="inherit" component={Link} to="/login">
                  login
                  </Button>
                  <Button color="inherit" component={Link} to="/register">
                  register
                  </Button>
                </>
              ) : (
                <>
                  {<Button color="inherit" component={Link} to="/favorites">
                  favorites
                  </Button>}
                  {user.username==='admin' ?
                    <Button color="inherit" component={Link} to="/add">
                    add movies
                    </Button>
                    : null}
                  <Button color="inherit" onClick={props.handleLogout} component={Link} to="/">
                  logout
                  </Button>
                </>
              )}
            </>
          }
        </span>
        <span style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Switch checked={props.mode==='light' ? false : true} onChange={props.handleToggleMode} />
          <ContrastIcon />
        </span>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar