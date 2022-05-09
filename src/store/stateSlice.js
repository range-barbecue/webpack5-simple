import { createSlice } from '@reduxjs/toolkit'

// 使用@reduxjs/toolkit精简rudex方法
const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
  },
  reducers: {
    setCount: (state, action) => {
      state.value = action.payload
    }
  },
})

export const setCount = counterSlice.actions.setCount
export const counterReducer = counterSlice.reducer
