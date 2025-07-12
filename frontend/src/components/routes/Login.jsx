import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import adminService from '../../services/admin'
import loginService from '../../services/login'
import { errorNotificationChange, errorNotificationReset } from '../../reducers/errorNotificationReducers'
import { changeUser } from '../../reducers/userReducers'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import ErrorNotification from '../utils/ErrorNotification'
import { useNavigate, Navigate } from 'react-router-dom'

const Login = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        email,
        password,
      })

      window.localStorage.setItem('loggedMovieappUser', JSON.stringify(user))
      adminService.setToken(user.token)
      dispatch(changeUser({ email: user.email, run: user.run, dv: user.dv, rol: user.rol }))
      setEmail('')
      setPassword('')

      navigate('/')

    } catch (exception) {
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
      <div>
        <br className="top-page"/>
        <ErrorNotification />
        <h2 style={font}>login</h2>
        <br />
        <form onSubmit={handleLogin}>
          <div>
            <TextField label="email"
              onChange={(event) => setEmail(event.target.value)}/>
          </div>
          <div>
            <TextField label="password" type='password'
              onChange={(event) => setPassword(event.target.value)} />
          </div>
          <br/>
          <div>
            <Button variant="contained" color="primary" type="submit" sx={{ backgroundColor: '#1976d2' }}>
              login
            </Button>
          </div>
        </form>
      </div>
      : <Navigate to="/"/>
  )
}

export default Login