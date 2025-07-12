import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import userService from '../../services/users'
import { changeUser } from '../../reducers/userReducers'
import { changeMovieList } from '../../reducers/movieListReducers'
import { notificationChange, notificationReset } from '../../reducers/notificationReducers'
import movieService from '../../services/movies'
import adminService from '../../services/admin'
import EditMovieModal from '../utils/EditMovieModal'
import ConfirmationDialog from '../utils/ConfirmationDialog'
import NotFound from './NotFound'

const Movie = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const imdbID = location.pathname.substring(8)

  const user = useSelector(state => state.user)
  const movielist = useSelector(state => state.movielist)

  const [movie, setMovie] = useState(null)
  const [rating, setRating] = useState([])
  const [loading, setLoading] = useState(true)
  const [exists, setExists] = useState(true)

  //para modal de edicion
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const movieStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    //border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const movieTitle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }

  const url = 'https://www.imdb.com/title/' + imdbID

  useEffect(() => {
    movieService
      .getMovie(imdbID)
      .then((movie) => {
        setMovie(movie)
        const stars = []
        for(let i=0; i<parseInt(movie.rating)/2; i++){
          stars.push(<StarIcon key={i}/>)
        }
        setRating(stars)
        setLoading(false)
      })
      .catch(() => {
        setExists(false)
        setLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const handleAddFavorite = () => {
    const favoriteMovies = [...user.favoriteMovies, movie.imdbID]
    userService.updateFavs({ username: user.username, favoriteMovies })
    dispatch(changeUser({ username: user.username, favoriteMovies }))
    window.localStorage.setItem('loggedMovieappUser', JSON.stringify({ username: user.username, favoriteMovies }))
  }

  const handleRemoveFavorite = () => {
    const favoriteMovies = user.favoriteMovies.filter(f => f!==movie.imdbID)
    userService.updateFavs({ username: user.username, favoriteMovies })
    dispatch(changeUser({ username: user.username, favoriteMovies }))
    window.localStorage.setItem('loggedMovieappUser', JSON.stringify({ username: user.username, favoriteMovies }))
  }

  //usa dialogo de confirmacion
  const handleRemoveMovie = () => {
    dispatch(notificationChange(`Removed movie ${movie.title}`))
    setTimeout(() => {
      dispatch(notificationReset())
    }, 5000)
    dispatch(changeMovieList(movielist.filter(m => m.imdbID !== movie.imdbID)))
    window.localStorage.setItem('MovieappList', JSON.stringify(movielist.filter(m => m.imdbID !== movie.imdbID)))
    adminService.removeMovie(movie.imdbID).then(() => navigate('/'))
  }

  return (
    loading===true ?
      <>
        <br className="top-page-search"/>
        <div>Loading...</div>
      </>
      :
      exists===true ?
        <div style={movieStyle}>
          <div style={movieTitle}>
            <br className="top-page"/>
            <h2>{movie.title} ({movie.year})</h2>
            <br style={{ margin: '10px 0' }}/>
            <img src={movie.poster} style={{ maxWidth: '90%', minWidth: '25%' }}/>
          </div>
          <br/>
          <div>
            <p>{movie.summary}</p>
            <br/>
            <div style={{ display: 'flex',alignItems: 'center',flexWrap: 'wrap' }}>
              <strong>Rating</strong>&nbsp;{rating}
            </div>
            <p><strong>Genres:</strong>&nbsp;{movie.genres.join(', ')}</p>
            <p><strong>Directed by:</strong>&nbsp;{movie.director}</p>
            <p><strong>Writers:</strong>&nbsp;{movie.writers.join(', ')}</p>
            <p><strong>Cast:</strong>&nbsp;{movie.cast.join(', ')}</p>
            <br/>
            <a href={url}>
              <Button>
              View IMDB page
              </Button>
            </a>
            {user ? user.favoriteMovies.find(f => f===imdbID) ?
              <Button onClick={handleRemoveFavorite}>
            Remove from favorites
              </Button>
              :
              <Button onClick={handleAddFavorite}>
            Add to favorite
              </Button>
              : null}
            {user?.username==='admin' ? <>
              <Button onClick={handleOpen}>Edit Movie</Button>
              <EditMovieModal open={open} handleClose={handleClose} movie={movie}/>
              {/*<Button onClick={handleRemoveMovie}>Remove Movie</Button>*/}
              <ConfirmationDialog
                title="Confirmation"
                description="Are you sure you want to remove the movie?"
                response={handleRemoveMovie}
              >
                {(showDialog) => (
                  <Button onClick={showDialog}>Remove Movie</Button>
                )}
              </ConfirmationDialog>
            </>
              : null}
          </div>
        </div>
        : <NotFound/>
  )
}

export default Movie