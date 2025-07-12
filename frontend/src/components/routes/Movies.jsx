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
  Grid2 as Grid,
  useTheme,
  useMediaQuery
} from '@mui/material'
import MovieCard from '../utils/MovieCard'

const Movies = ({ favorites=false }) => {
  //console.log('favorites: '+favorites)

  //for responsiveness - if the browser is on mobile mode, then the cards are centered
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

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

  const gridStyle = {
    justifyContent:'space-evenly', alignItems:'center'
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
              <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} style={ isMobile ? gridStyle : null }>
                {movies.map((movie, index) => (
                  index >= (page-1)*12 && index < page*12 ?
                    <Grid key={movie.imdbID} size={{ xs: 3, /*sm: 4, md: 4*/ }}>
                      <MovieCard movie={movie}/>
                      <br />
                    </Grid>
                    : null
                ))}
              </Grid>
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

export default Movies