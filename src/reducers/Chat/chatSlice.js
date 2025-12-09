import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";

export const fetchConversations = createAsyncThunk(
  "chat/fetchConversations",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/chat/messages/conversations/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch conversations.");
    }
  }
);

export const fetchMessages = createAsyncThunk(
  "chat/fetchMessages",
  async (receiverId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/chat/messages/thread/?user_id=${receiverId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch messages.");
    }
  }
);

export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ receiver, content }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/chat/messages/", { receiver, content });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to send message.");
    }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    conversations: [],
    messages: [],
    loading: false,
    error: null,
  },
  reducers: {
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
    clearChat: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Conversations
      .addCase(fetchConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
      })
      .addCase(fetchConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Messages
      .addCase(fetchMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.messages = action.payload;
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Send Message
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push(action.payload);
      });
  },
});

export const { addMessage, clearChat } = chatSlice.actions;
export default chatSlice.reducer;
