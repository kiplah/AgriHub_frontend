import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios/config';



export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/review/reviews');
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to fetch reviews');
  }
});

export const saveReview = createAsyncThunk('reviews/saveReview', async (review, { rejectWithValue }) => {
  try {
    const response = await axios.post('/review/new-review', review);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response?.data || 'Failed to save review');
  }
});

export const fetchReviewsByProductId = createAsyncThunk(
  'reviews/fetchReviewsByProductId',
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/review/product-review/${productId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch reviews for product');
    }
  }
);



const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    reviews: [],
    stats: { avgRating: 0, totalReviews: 0 },
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(saveReview.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveReview.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews.push(action.payload.review);
      })
      .addCase(saveReview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchReviewsByProductId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReviewsByProductId.fulfilled, (state, action) => {
        state.loading = false;
        state.reviews = action.payload.reviews || [];
        
        state.stats = {
          avgRating: action.payload.stats?.avg_rating || 0,
          totalReviews: action.payload.stats?.total_reviews || 0,
        };
      })
      
      
      .addCase(fetchReviewsByProductId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

  },
});

export const reviewsReducer = reviewsSlice.reducer;

