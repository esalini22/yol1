import { Link } from 'react-router-dom'
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
} from '@mui/material'
//import { useState } from 'react'
//import MovieModal from './MovieModal'

const MovieCard = ({ movie }) => {
  /*const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)*/

  const style = {
    height: 250,
    paddintTop: '150%'
  }

  return (
    <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <>
        <CardMedia
          style={{ display: 'flex', justifyContent: 'center' }}
          title={movie.title}
          sx={{ padding: '1em 1em 0 1em', objectFit: 'contain' }}
        >
          <img src={movie.poster} style={style} />
        </CardMedia>
        <CardContent>
          <Typography variant="h5" component="div" height="50" noWrap="true">
            {movie.title}
          </Typography>
          <Typography variant="body2">
            {movie.year}
          </Typography>
        </CardContent>
      </>
      <CardActions>
        {<Button size="small" component={Link} to={`/movies/${movie.imdbID}`}>View</Button>}
        {/*<Button onClick={handleOpen}>View</Button>}
        <MovieModal open={open} handleClose={handleClose} movie={movie}/>*/}
      </CardActions>
    </Card>
  )
}

export default MovieCard