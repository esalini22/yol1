import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Notification from '../utils/Notification'
import ErrorNotification from '../utils/ErrorNotification'
import {
  //Switch,
  //FormGroup,
  //FormControlLabel,
  TextField,
  Box,
  Pagination,
  useTheme,
  useMediaQuery
} from '@mui/material'

const Score = ({ favorites=false }) => {
  //console.log('favorites: '+favorites)

  const movielist = useSelector(state => state.movielist)
  const user = useSelector(state => state.user)

  const [movies, setMovies] = useState([])
  const [filter, setFilter] = useState('')
  const [page, setPage] = useState(1)
  //const [favorites, setFavorites] = useState(false) //recibe variable como argumento

  useEffect(() => {
    if(favorites===true){
      setMovies(movielist.filter(m => m.title.toLowerCase().includes(filter.toLowerCase()) && user?.favoriteMovies.includes(m.imdbID)))
    }
    else{
      setMovies(movielist.filter(m => m.title.toLowerCase().includes(filter.toLowerCase())))
    }
  }, [movielist, filter, favorites, user?.favoriteMovies])

  if(movielist.length===0){
    return <div><br className="top-page-search"/>loading...</div>
  }

  const handlePageChange = (event, value) => {
    setPage(value)
  }

  const font = {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: '150'
  }

  return (
    <div>
      <br className="top-page-search"/>
      <ErrorNotification />
      <Notification />
      <div>
        <TextField label="Search" variant="outlined"
          onChange={() => setFilter(event.target.value)}/>
        {/*user===null ? null :
              <FormGroup>
                <FormControlLabel control={<Switch onChange={() => setFavorites(!favorites)}/>} label="Show favorites"/>
              </FormGroup>
            */}
      </div>
      <br />
      <div>
        {favorites ?
          <h2 style={font}>FAVORITE MOVIES</h2>
          : <h2 style={font}>MOVIES</h2>}
        {movies.length ?
          <>
            <Box sx={{ m: 2, flexGrow: 1 }}>
              <Pagination
                count={Math.ceil(movies.length/12)}
                sx={{ button:{ color: 'white', bgcolor: '#1976d2' } }}
                page={page}
                onChange={handlePageChange}
              />
              <br/>
              <br/>
              <Pagination
                count={Math.ceil(movies.length/12)}
                sx={{ button:{ color: 'white', bgcolor: '#1976d2' } }}
                page={page}
                onChange={handlePageChange}
              />
            </Box>
          </>
          : <>
            <br/>
            <p>no movies to show</p>
          </>}
      </div>
    </div>
  )
}

export default Score