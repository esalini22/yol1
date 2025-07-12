/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useMemo } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeUser, resetUser } from './reducers/userReducers'
import adminService from './services/admin'
import Score from './components/routes/Score'
import Login from './components/routes/Login'
import NotFound from './components/routes/NotFound'
import Navbar from './components/utils/Navbar'
import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const App = () => {
  const dispatch = useDispatch()

  const [mode, setMode] = useState('light')

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode
        }
      }),
    [mode]
  )

  const handleLogout = async (_event) => {
    window.localStorage.removeItem('loggedMovieappUser')
    adminService.setToken(null)
    dispatch(resetUser())
  }

  const handleToggleMode = async (_event) => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    window.localStorage.setItem('Mode', JSON.stringify(newMode))
    setMode(newMode)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth={false}>
        <Router>
          <Navbar handleLogout={handleLogout} mode={mode} handleToggleMode={handleToggleMode}/>
          <Routes>
            <Route path="/" />
            <Route path="/score" element={<Score />} />
            <Route path="/login" element={<Login />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App
