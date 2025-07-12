import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotificationChange, errorNotificationReset } from '../../reducers/errorNotificationReducers'
import scoreService from '../../services/score'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ErrorNotification from '../utils/ErrorNotification'
import { useNavigate, Navigate } from 'react-router-dom'

const Score = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [run, setRun] = useState('')
  const [dv, setDv] = useState('')
  const [score, setScore] = useState(null)

  const handleScore = async (event) => {
    event.preventDefault()

    try {
      const result = await scoreService.checkScore({
        run,
        dv,
      })

      //window.localStorage.setItem('loggedMovieappUser', JSON.stringify(user))
      //dispatch(changeUser({ email: user.email/*, favoriteMovies: user.favoriteMovies*/ }))
      setRun('')
      setDv('')
      setScore(score)

    } catch (exception) {
      setScore(null)
      dispatch(errorNotificationChange('Wrong credentials'))
      setTimeout(() => {
        dispatch(errorNotificationReset())
      }, 5000)
    }
  }

  const font = {
    fontFamily: '"Roboto", sans-serif',
    fontWeight: '150'
  }

  return (
    user === null ?
    <Navigate to="/"/>
    : <div>
        <br className="top-page"/>
        <ErrorNotification />
        <h2 style={font}>consultar rut</h2>
        <br />
        <form onSubmit={handleScore}>
          <div>
            <TextField label="run"
              onChange={(event) => setRun(event.target.value)}/>
          </div>
          <div>
            <TextField label="dv" type='password'
              onChange={(event) => setDv(event.target.value)} />
          </div>
          <br/>
          <div>
            <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#1976d2' }}>
              consultar
            </Button>
          </div>
          {score==null ? null : 
            <>
              <br/>
              <h2>RUT: {result.rut}</h2>
              <h2>score: {result.score}</h2>
              <h2>fecha: {result.fecha}</h2>
            </>
          }
        </form>
      </div>
  )
}

export default Score