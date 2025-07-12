import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { errorNotificationChange, errorNotificationReset } from '../../reducers/errorNotificationReducers'
import scoreService from '../../services/score'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ErrorNotification from '../utils/ErrorNotification'
import { Navigate } from 'react-router-dom'

const Score = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [run, setRun] = useState('')
  const [dv, setDv] = useState('')
  const [result, setResult] = useState(null)

  const handleScore = async (event) => {
    event.preventDefault()

    if(run===null || dv===null){
      setResult(null)
      dispatch(errorNotificationChange('Enter Rut'))
      setTimeout(() => {
        dispatch(errorNotificationReset())
      }, 5000)
    }

    else if(user.rol!=='admin' && user.run!==run && user.dv!==dv ){
      setResult(null)
      dispatch(errorNotificationChange('Rut inserted does not belong to current user'))
      setTimeout(() => {
        dispatch(errorNotificationReset())
      }, 5000)
    }

    else{
      try {
        const result = await scoreService.checkScore(run, dv)
        setResult(result)

        if(result===null){
          dispatch(errorNotificationChange('User not found'))
          setTimeout(() => {
            dispatch(errorNotificationReset())
          }, 5000)
        }
        else{
          setRun('')
          setDv('')
        }

      } catch (exception) {
        setResult(null)
        dispatch(errorNotificationChange('User not found'))
        setTimeout(() => {
          dispatch(errorNotificationReset())
        }, 5000)
      }
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
            <TextField label="run" value={run}
              inputProps={{ maxLength: 8 }}
              onChange={(event) => setRun(event.target.value.replace(/\D/g, ''))}/>
          </div>
          <div>
            <TextField label="dv" value={dv}
              inputProps={{ maxLength: 1 }}
              onChange={(event) => setDv(event.target.value)} />
          </div>
          <br/>
          <div>
            <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#1976d2' }}>
              consultar
            </Button>
          </div>
          {result==null ? null : 
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