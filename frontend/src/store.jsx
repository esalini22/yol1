import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducers'
import errorNotificationReducer from './reducers/errorNotificationReducers'
import userReducer from './reducers/userReducers'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    errorNotification: errorNotificationReducer,
    user: userReducer
  }
})

export default store