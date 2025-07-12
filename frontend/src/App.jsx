/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect, useState, useMemo } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { changeUser, resetUser } from './reducers/userReducers'
import { changeMovieList } from './reducers/movieListReducers'
import movieService from './services/movies'
import adminService from './services/admin'
import Movies from './components/routes/Movies'
import Movie from './components/routes/Movie'
import Login from './components/routes/Login'
import Register from './components/routes/Register'
import Favorites from './components/routes/Favorites'
import NotFound from './components/routes/NotFound'
import AddMovie from './components/routes/AddMovie'
import Navbar from './components/utils/Navbar'
import { Container, CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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

  useEffect(() => {
    const mode = window.localStorage.getItem('Mode')
    if(mode) setMode(JSON.parse(mode))

    const movies = window.localStorage.getItem('MovieappList')
    if(movies){
      dispatch(changeMovieList(JSON.parse(movies)))
    }
    else{
      movieService
        .getResults()
        .then((movies) => {
          dispatch(changeMovieList(movies))
          window.localStorage.setItem('MovieappList', JSON.stringify(movies))
        })
    }

    const loggedUserJSON = window.localStorage.getItem('loggedMovieappUser')
    if (loggedUserJSON && user===null) {
      const user = JSON.parse(loggedUserJSON)
      adminService.setToken(user.token)
      dispatch(changeUser({ username: user.username, favoriteMovies: user.favoriteMovies }))
    }
  }, [])

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
            <Route path="/" element={<Movies favorites={false}/>} />
            <Route path="/movies/:id" element={<Movie />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/favorites" element={<Favorites/>} />
            <Route path="/add" element={<AddMovie />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Router>
      </Container>
    </ThemeProvider>
  )
}

export default App
