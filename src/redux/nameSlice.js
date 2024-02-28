import { createSlice } from '@reduxjs/toolkit';

export const nameSlice = createSlice({
  name: 'name',
  initialState: {
    filters: {
      name: '',
    },
  },
  
  reducers: {
    changeValue: (state, action) => {
      state.filters.name = action.payload;
    },
  },
});

export const {changeValue}= nameSlice.actions
export const nameReducer = nameSlice.reducer