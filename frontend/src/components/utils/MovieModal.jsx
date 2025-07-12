import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import StarIcon from '@mui/icons-material/Star'
import { Fragment } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import userService from '../../services/users'
import { changeUser } from '../../reducers/userReducers'

const MovieModal = ({ open, handleClose, movie }) => {

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  const title = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  const span = {
    fontSize: '14px'
  }

  const url = 'https://www.imdb.com/title/' + movie.imdbID

  const stars = []
  for(let i=0; i<parseInt(movie.rating)/2; i++){
    stars.push(<StarIcon key={i}/>)
  }

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

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="modal-modal-title" variant="h6" component="h2" style={title}>
          <div>
            {movie.title}&nbsp;<span style={span}>({movie.year})</span>
          </div>
          <div>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="modal-modal-description" sx={{ mt: 2 }}>
            {movie.summary}
          </DialogContentText>
          <DialogContentText id="modal-modal-description" sx={{ mt: 2 } } style={{ display: 'flex',alignItems: 'center',flexWrap: 'wrap' }}>
            <strong>Rating</strong>&nbsp;{stars}
          </DialogContentText>
          <DialogContentText id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Genres:</strong>&nbsp;{movie.genres.join(', ')}
          </DialogContentText>
          <DialogContentText id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Directed by:</strong>&nbsp;{movie.director}
          </DialogContentText>
          <DialogContentText id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Writers:</strong>&nbsp;{movie.writers.join(', ')}
          </DialogContentText>
          <DialogContentText id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Cast:</strong>&nbsp;{movie.cast.join(', ')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <a href={url}>
            <Button>
              View IMDB page
            </Button>
          </a>
          {user ? user.favoriteMovies.find(f => f===movie.imdbID) ?
            <Button onClick={handleRemoveFavorite}>
              Remove from favorites
            </Button>
            :
            <Button onClick={handleAddFavorite}>
              Add to favorite
            </Button>
            : null}
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default MovieModal