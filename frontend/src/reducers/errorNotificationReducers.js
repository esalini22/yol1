import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const errorNotificationSlice = createSlice({
  name: 'errorNotification',
  initialState,
  reducers: {
    errorNotificationChange(state, action) {
      return action.payload
    },
    errorNotificationReset() {
      return ''
    },
  }
})

export const { errorNotificationChange, errorNotificationReset } = errorNotificationSlice.actions
export default errorNotificationSlice.reducer