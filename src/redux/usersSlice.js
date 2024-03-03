import { createSlice } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import { fetchContacts, addContact, deleteContact } from './operations';
import storage from 'redux-persist/lib/storage';

const handlePending = state => {
  state.isLoading = true;
};

const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;
};

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.users = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.users.push(action.payload);
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        const index = state.users.findIndex(user => user.id === action.payload.id);
        state.users.splice(index, 1);
      }),
});

// export const userReducer = usersSlice.reducer;

const persistConfig = {
  key: 'user',
  storage,
};

export const userReducer = persistReducer(persistConfig, usersSlice.reducer);
