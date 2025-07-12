import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Button
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { Link } from 'react-router-dom'

const HamburgerMenu = (props) => {
  const [openDrawer, setOpenDrawer] = useState(false)

  const user = useSelector(state => state.user)

  return (
    <>
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <List>
          {user === null ? (
            <>
              <ListItem onClick={() => setOpenDrawer(false)}>
                <ListItemText>
                  <Button variant="text" component={Link} to="/login">
                    Login
                  </Button>
                </ListItemText>
              </ListItem>
            </>
          )
            : (
              <>
                {user.username==='admin' ?
                  <ListItem onClick={() => setOpenDrawer(false)}>
                    <ListItemText>
                      <Button variant="text" component={Link} to="/add">
                        Scores
                      </Button>
                    </ListItemText>
                  </ListItem>
                  : 
                  <ListItem onClick={() => setOpenDrawer(false)}>
                    <Button variant="text" component={Link} to="/favorites">
                      Score
                    </Button>
                  </ListItem>}
                <ListItem onClick={() => setOpenDrawer(false)}>
                  <ListItemText>
                    <Button variant="text" onClick={props.handleLogout} component={Link} to="/">
                      Logout
                    </Button>
                  </ListItemText>
                </ListItem>
              </>
            )
          }
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  )
}
export default HamburgerMenu