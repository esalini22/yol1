import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material'
import { Fragment, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import adminService from '../../services/admin'
import { changeMovieList } from '../../reducers/movieListReducers'

const EditMovieModal = ({ open, handleClose, movie }) => {

  const [summary, setSummary] = useState(movie.summary)
  const [rating, setRating] = useState(movie.rating)
  const [genres, setGenres] = useState(movie.genres)
  const [runtime, setRuntime] = useState(movie.runtime)
  const [director, setDirector] = useState(movie.director)
  const [writers, setWriters] = useState(movie.writers)
  const [cast, setCast] = useState(movie.cast)
  const [poster, setPoster] = useState(movie.poster)

  const dispatch = useDispatch()
  const movielist = useSelector(state => state.movielist)

  const title_style = {
    display: 'flex',
    justifyContent: 'space-between'
  }

  const span = {
    fontSize: '14px'
  }

  const handleEditMovie = () => {
    const editedMovie = {
      title: movie.title,
      imdbID: movie.imdbID,
      year: movie.year,
      summary,
      rating,
      genres,
      runtime,
      director,
      writers,
      cast,
      poster
    }
    adminService.editMovie(editedMovie).then(ret => {
      dispatch(changeMovieList(movielist.map(m => {
        if(m.imdbID === ret.imdbID) return ret
        else return m
      })))
      window.localStorage.setItem('MovieappList', JSON.stringify(movielist.map(m => {
        if(m.imdbID === ret.imdbID) return ret
        else return m
      })))
      handleClose()
    })
  }

  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <DialogTitle id="modal-modal-title" variant="h6" component="h2" style={title_style}>
          <div>
            {movie.title}&nbsp;<span style={span}>({movie.year})</span>
          </div>
          <div>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Summary"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
            defaultValue={movie.summary}
            onChange={() => setSummary(event.target.value)}
          />
          <TextField
            label="Rating"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
            defaultValue={movie.rating}
            onChange={() => setRating(event.target.value)}
          />
          <TextField
            label="Genres"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
            defaultValue={movie.genres.toString()}
            onChange={() => setGenres(event.target.value.split(','))}
          />
          <TextField
            label="Runtime"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
            defaultValue={movie.runtime}
            onChange={() => setRuntime(event.target.value)}
          />
          <TextField
            label="Director"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
            defaultValue={movie.director}
            onChange={() => setDirector(event.target.value)}
          />
          <TextField
            label="Writers"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
            defaultValue={movie.writers.toString()}
            onChange={() => setWriters(event.target.value.split(','))}
          />
          <TextField
            label="Cast"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
            defaultValue={movie.cast.toString()}
            onChange={() => setCast(event.target.value.split(','))}
          />
          <TextField
            label="Poster"
            id="filled-start-adornment"
            sx={{ m: 1, width: '25ch' }}
            variant="filled"
            defaultValue={movie.poster}
            onChange={() => setPoster(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditMovie}>
            Submit changes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}

export default EditMovieModal