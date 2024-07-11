// src/redux/slices/newsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/api/news');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.articles = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default newsSlice.reducer;
