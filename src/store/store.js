import { configureStore } from '@reduxjs/toolkit'
import { counterReducer, counterSlice } from './stateSlice'


const store = configureStore({
  reducer: {
    counter: counterReducer
  },
})

export default store