import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; 

const API_BASE_URL = "http://localhost:8081/message"; 

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async ({ senderId, receiverId, limit = 20, offset = 0 }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        throw new Error("Authorization token is missing. Please log in again.");
      }

      const response = await axios.get(
        `${API_BASE_URL}/messages?receiverId=${receiverId}&limit=${limit}&offset=${offset}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.messages;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch messages.");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ senderId, receiverId, content }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        throw new Error("Authorization token is missing. Please log in again.");
      }

      const response = await axios.post(
        `${API_BASE_URL}/new`,
        { senderId, receiverId, content },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.message;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send message.");
    }
  }
);

  

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      const exists = state.messages.some(
        (msg) =>
          msg.senderId === action.payload.senderId &&
          msg.content === action.payload.content &&
          msg.timestamp === action.payload.timestamp
      );

      if (!exists) {
        state.messages.push(action.payload);
      }
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log("✅ Messages in Redux after Fetch:", action.payload);
        state.loading = false;
        state.messages = action.payload || [];
      })
      
      
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.messages = [];
      })
  
      
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { addMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
