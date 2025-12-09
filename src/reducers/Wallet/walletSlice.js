import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";

export const fetchWallet = createAsyncThunk(
    "wallet/fetchWallet",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/wallet/wallet/");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to fetch wallet.");
        }
    }
);

export const depositFunds = createAsyncThunk(
    "wallet/deposit",
    async (amount, { rejectWithValue }) => {
        try {
            const response = await axios.post("/wallet/wallet/deposit/", { amount });
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.message || "Failed to deposit funds.");
        }
    }
);

const walletSlice = createSlice({
    name: "wallet",
    initialState: {
        wallet: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchWallet.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchWallet.fulfilled, (state, action) => {
                state.loading = false;
                state.wallet = action.payload;
            })
            .addCase(fetchWallet.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(depositFunds.fulfilled, (state, action) => {
                state.wallet = action.payload; // Updates wallet with new balance
            });
    },
});

export default walletSlice.reducer;
