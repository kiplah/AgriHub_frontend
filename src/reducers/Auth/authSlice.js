import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";
import { jwtDecode } from "jwt-decode";

const initialState = {
  user: null,
  token: null,
  role: null,
  users: [],
  loading: false,
  error: null,
};


const TOKEN_EXPIRATION_TIME = 2 * 60 * 60 * 1000;

const loadStateFromLocalStorage = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("access_token");
    const role = localStorage.getItem("user_role");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("token_expiration");

    if (token && tokenExpiration) {
      const currentTime = new Date().getTime();
      if (currentTime > Number(tokenExpiration)) {
        console.log("Token expired. Clearing local storage...");
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_role");
        localStorage.removeItem("userId");
        localStorage.removeItem("token_expiration");
        return { user: null, token: null, role: null };
      }

      try {
        const decodedToken = jwtDecode(token);
        return {
          user: { ...decodedToken, userId },
          token,
          role,
        };
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }
  return { user: null, token: null, role: null };
};

const persistedState = typeof window !== "undefined" ? loadStateFromLocalStorage() : {};

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/login/", { email, password });
      if (response.status === 200) {
        const { access, user } = response.data;
        const accessToken = access;
        const decodedToken = jwtDecode(accessToken);
        const expirationTime = new Date().getTime() + TOKEN_EXPIRATION_TIME;

        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("user_role", user.role);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("token_expiration", expirationTime);

        return { token: accessToken, role: user.role, user: user };
      } else {
        return rejectWithValue({ message: "Unexpected response status." });
      }
    } catch (err) {
      console.error("Login Failed:", err.response?.data || err.message || err);
      return rejectWithValue(err.response?.data || { message: "Login failed. Please try again." });
    }
  }
);


export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/signup/", userData);
      console.log("Backend Response:", response.data);

      if (response.status === 200 || response.status === 201) {
        return { email: userData.email };
      } else {
        return rejectWithValue({ message: "Unexpected response status." });
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || { message: "Registration failed. Please try again." });
    }
  }
);


export const verifyEmail = createAsyncThunk(
  "auth/verify",
  async ({ email, code }, { rejectWithValue }) => {
    try {
      const response = await axios.post("/verify/", { email, code });

      if (response.status === 200) {
        const { event } = response.data;
        const expirationTime = new Date().getTime() + TOKEN_EXPIRATION_TIME;

        localStorage.setItem("access_token", event.token);
        localStorage.setItem("user_role", event.Role);
        localStorage.setItem("userId", event.ID);
        localStorage.setItem("user_email", event.Email);
        localStorage.setItem("token_expiration", expirationTime);

        return {
          user: {
            id: event.ID,
            email: event.Email,
            username: event.Username,
            role: event.Role,
          },
          token: event.token,
          role: event.Role,
        };
      } else {
        console.error("Unexpected response:", response);
        return rejectWithValue({ message: "Unexpected response from server." });
      }
    } catch (err) {
      console.error("Verification Error:", err.response?.data || err.message);
      return rejectWithValue(err.response?.data || { message: "Email verification failed. Please try again." });
    }
  }
);


export const fetchUsers = createAsyncThunk(
  "auth/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/users");
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to fetch users." });
    }
  }
);

export const updateUser = createAsyncThunk(
  "auth/updateUser",
  async ({ userId, userData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/users/${userId}/`, userData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to update user." });
    }
  }
);

export const deleteUser = createAsyncThunk(
  "auth/deleteUser",
  async (userId, { rejectWithValue }) => {
    try {
      await axios.delete(`/users/${userId}/`);
      return userId;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to delete user." });
    }
  }
);

export const resendVerificationCode = createAsyncThunk(
  "auth/resendVerification",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/resend_verification/", { email });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to resend verification code." });
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/forgot_password/", { email });
      return response.data;
    } catch (err) {
      console.error("Forgot Password Failed:", err.response?.data || err.message || err);
      return rejectWithValue(err.response?.data || { message: "Failed to send password reset email." });
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/reset_password/", data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || { message: "Failed to reset password." });
    }
  }
);


export const logout = createAsyncThunk("/logout", async (_, { dispatch, rejectWithValue }) => {
  try {
    await axios.post("/logout/");

    localStorage.removeItem("access_token");
    localStorage.removeItem("user_role");
    localStorage.removeItem("userId");
    localStorage.removeItem("token_expiration");

    dispatch(authSlice.actions.clearState());

    return { success: true, message: "Logout successful" };
  } catch (error) {
    console.error("Error during logout:", error);
    return rejectWithValue(error.response?.data || "Logout failed");
  }
});



const authSlice = createSlice({
  name: "auth",
  initialState: {
    ...initialState,
    ...persistedState,
  },

  reducers: {
    setToken: (state, action) => {
      const token = action.payload;
      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          state.token = token;
          state.role = decodedToken.role || null;
          state.user = decodedToken;
        } catch (error) {
          console.error("Error decoding token:", error);
          state.token = null;
          state.role = null;
        }
      }
    },

    clearState: (state) => {
      state.user = null;
      state.token = null;
      state.role = null;
      state.users = [];
      state.loading = false;
      state.error = null;
      state.verificationSent = false;
      state.verified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // **Handle login**
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // **Handle registration**
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(verifyEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.verified = false;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.loading = false;
        state.verified = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.role = action.payload.role;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // **Handle updating a user**
      .addCase(updateUser.fulfilled, (state, action) => {
        const updatedIndex = state.users.findIndex((user) => user.id === action.payload.id);
        if (updatedIndex !== -1) {
          state.users[updatedIndex] = { ...state.users[updatedIndex], ...action.payload };
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload.message;
      })

      // **Handle deleting a user**
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload.message;
      })

      // **Handle Resend Verification**
      .addCase(resendVerificationCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resendVerificationCode.fulfilled, (state) => {
        state.loading = false;
        // Maybe set a success message state if needed
      })
      .addCase(resendVerificationCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // **Handle Forgot Password**
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // **Handle Reset Password**
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })

      // **Handle logout**
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.role = null;
        state.users = [];
      });
  },
});

export const { setToken, clearState } = authSlice.actions;
export default authSlice.reducer;
