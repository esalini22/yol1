import { createSlice } from '@reduxjs/toolkit'

const initialState =  null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    changeUser(state, action) {
      return action.payload
    },
    resetUser(state, action) {
      return initialState
    }
  }
})

export const { changeUser, resetUser } = userSlice.actions
export default userSlice.reducer