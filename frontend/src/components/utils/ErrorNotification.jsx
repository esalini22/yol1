import { useSelector } from 'react-redux'
import {
  Alert
} from '@mui/material'

const ErrorNotification = () => {
  const errorNotification = useSelector(state => state.errorNotification)
  if(errorNotification===''){
    return null
  }
  return (
    <Alert severity="error">{errorNotification}</Alert>
  )
}

export default ErrorNotification
