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
        state.isLoading = false
        state.error = false
        state.users = action.payload
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = false
        state.users.push(action.payload)
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false
        state.error = false
        const index = state.users.findIndex(user => user.id === action.payload.id)
        state.users.splice(index, 1)
      })
//   {
//     addUser: (state, action) => {
//       state.contacts.users = [...state.contacts.users, action.payload];
//     },

//     deleteUser: (state, action) => {
//       state.contacts.users = state.contacts.users.filter(user => user.id !== action.payload);
//     },
//   },
});

const persistConfig = {
  key: 'user',
  storage,
};

// const usersSlice = createSlice({
//   name: 'users',
//   initialState: {
//     contacts: {
//       users: [],
//       loading: false,
//       error: null,
//     },
//   },
//   reducers: {
//     addUser: (state, action) => {
//       state.contacts.users = [...state.contacts.users, action.payload];
//     },

//     deleteUser: (state, action) => {
//       state.contacts.users = state.contacts.users.filter(user => user.id !== action.payload);
//     },
//   },
// });

// const persistConfig = {
//   key: 'user',
//   storage,
// };

// export const { addUser, deleteUser } = usersSlice.actions;
export const userReducer = persistReducer(persistConfig, usersSlice.reducer);
//!_----------------------------
// export const addUser = createAction('users/add');
// export const deleteUser = createAction('users/delete');

// export const usersReducer = createReducer(initialState, builder =>
//   builder
//     .addCase(addUser, (state, action) => {
//       return {
//         users: [...state.users, action.payload],
//       };
//     })
//     .addCase(deleteUser, (state, action) => {
//       return {
//         users: state.users.filter(user => user.id !== action.payload),
//       };
//     })
// );

// export const addUser = value => {
//   return {
//     type: 'users/add',
//     payload: value,
//   };
// };

// export const deleteUser = id => {
//   return {
//     type: 'users/delete',
//     payload: id,
//   };
// };

// export const usersReducer = (state = usersInitialState, action) => {
//   switch (action.type) {
//     case 'users/add':
//       return {
//         ...state,
//         users: [...state.users, action.payload],
//       };
//     case 'users/delete':
//       return {
//         ...state,
//         users: state.users.filter(user => user.id !== action.payload),
//       };
//     default:
//       return state;
//   }
// };
