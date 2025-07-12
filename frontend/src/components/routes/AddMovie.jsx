import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  TextField
} from '@mui/material'
import NotFound from './NotFound'
import adminService from '../../services/admin'
import { changeMovieList } from '../../reducers/movieListReducers'
import { notificationChange, notificationReset } from '../../reducers/notificationReducers'
import { useNavigate } from 'react-router-dom'

const AddMovie = () => {
  const navigate = useNavigate()

  const dispatch = useDispatch()

  const [title, setTitle] = useState('')
  const [imdbID, setID] = useState('')
  const [year, setYear] = useState('')
  const [summary, setSummary] = useState('')
  const [rating, setRating] = useState('')
  const [genres, setGenres] = useState([])
  const [runtime, setRuntime] = useState('')
  const [director, setDirector] = useState('')
  const [writers, setWriters] = useState([])
  const [cast, setCast] = useState([])
  const [poster, setPoster] = useState('')

  const movielist = useSelector(state => state.movielist)

  const handleAddMovie = () => {
    const movie = {
      title,
      imdbID,
      year,
      summary,
      rating,
      genres,
      runtime,
      director,
      writers,
      cast,
      poster
    }
    adminService.addMovie(movie).then(m => {
      setTitle('')
      setID('')
      setYear('')
      setSummary('')
      setRating('')
      setRuntime('')
      setDirector('')
      setPoster('')
      setGenres([])
      setWriters([])
      setCast([])
      dispatch(changeMovieList([...movielist, m]))
      window.localStorage.setItem('MovieappList', JSON.stringify([...movielist, m]))
      dispatch(notificationChange(`Added movie ${movie.title}`))
      setTimeout(() => {
        dispatch(notificationReset())
      }, 5000)
      navigate('/')
    })
  }

  const user = useSelector(state => state.user)
  if(user===null || user.username!=='admin') return <NotFound/>

  return (
    <div>
      <br className="top-page-search"/>
      <div>
        <TextField
          color="inherit"
          label="Title"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={title}
          onChange={() => setTitle(event.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Year"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={year}
          onChange={() => setYear(event.target.value)}
        />
      </div>
      <div>
        <TextField
          label="IMBD ID"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={imdbID}
          onChange={() => setID(event.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Summary"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={summary}
          onChange={() => setSummary(event.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Rating"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={rating}
          onChange={() => setRating(event.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Genres"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={genres.toString()}
          onChange={() => setGenres(event.target.value.split(','))}
        />
      </div>
      <div>
        <TextField
          label="Runtime"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={runtime}
          onChange={() => setRuntime(event.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Director"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={director}
          onChange={() => setDirector(event.target.value)}
        />
      </div>
      <div>
        <TextField
          label="Writers"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={writers.toString()}
          onChange={() => setWriters(event.target.value.split(','))}
        />
      </div>
      <div>
        <TextField
          label="Cast"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={cast.toString()}
          onChange={() => setCast(event.target.value.split(','))}
        />
      </div>
      <div>
        <TextField
          label="Poster"
          id="filled-start-adornment"
          sx={{ m: 1, width: '25ch' }}
          variant="filled"
          defaultValue={poster}
          onChange={() => setPoster(event.target.value)}
        />
      </div>
      <div>
        <Button onClick={handleAddMovie}>
        Submit changes
        </Button>
      </div>
    </div>
  )
}

export default AddMovie