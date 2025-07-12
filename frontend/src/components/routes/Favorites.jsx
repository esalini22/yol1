/* eslint-disable linebreak-style */
import { useSelector } from 'react-redux'
import Notification from '../utils/Notification'
import ErrorNotification from '../utils/ErrorNotification'
import { Navigate } from 'react-router-dom'
import Movies from './Movies'

const Favorites = () => {
  const user = useSelector(state => state.user)

  return (
    <div>
      <ErrorNotification />
      <Notification />
      { user === null ?
        <Navigate to="/"/> :
        <Movies favorites={true}/>
      }
    </div>
  )
}

export default Favorites