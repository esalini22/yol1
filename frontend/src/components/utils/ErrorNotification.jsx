import { useSelector } from 'react-redux'

const ErrorNotification = () => {
  const errorNotification = useSelector(state => state.errorNotification)
  if(errorNotification===''){
    return null
  }
  return (
    <div className="error">
      {errorNotification}
    </div>
  )
}

export default ErrorNotification