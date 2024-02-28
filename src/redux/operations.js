import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'https://65d9c96cbcc50200fcdc1bd5.mockapi.io';

export const fetchContacts = createAsyncThunk('contacts/fetchAll', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/contacts');
    console.log(response);
    return response.data;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk('contacts/addContact', async data => {
  const response = await axios.post('/contacts', data);
  return response.data;
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async id => {
  const response = await axios.delete(`/contacts/${id}`);
  return response.data;
});
