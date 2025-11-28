import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";

export const sendContactMessage = createAsyncThunk(
  "contact/sendContactMessage",
  async (contactData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contact-us", contactData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);

const contactSlice = createSlice({
  name: "contact",
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendContactMessage.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(sendContactMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(sendContactMessage.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = typeof action.payload === "object" ? action.payload.message : action.payload;
      });
  },
});

export const { resetState } = contactSlice.actions;
export default contactSlice.reducer;
