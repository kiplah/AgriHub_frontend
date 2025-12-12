import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios/config";

export const createProduct = createAsyncThunk(
  "product/createProduct",
  async (formData, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        throw new Error("Authorization token is missing. Please log in again.");
      }

      const response = await axios.post("/products/", formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
        error.message ||
        "Failed to create product. Please try again."
      );
    }
  }
);

export const updateProduct = createAsyncThunk(
  "product/updateProduct",
  async ({ id, formData }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;
      if (!token) {
        throw new Error("Authorization token is missing.");
      }

      const response = await axios.put(`/products/${id}/`, formData);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update product."
      );
    }
  }
);



export const getProducts = createAsyncThunk(
  "product/getallproducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/products/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (productId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/products/${productId}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch product.");
    }
  }
);


export const deleteProduct = createAsyncThunk(
  "product/deleteProduct",
  async (productId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        throw new Error("Authorization token is missing. Please log in again.");
      }

      const response = await axios.delete(`/products/${productId}/`);

      return { productId };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to delete product. Please try again."
      );
    }
  }
);

export const getProductByUserId = createAsyncThunk(
  "product/getProductByUserId",
  async (userId, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token;

      if (!token) {
        throw new Error("Authorization token is missing. Please log in again.");
      }

      const response = await axios.get(`/products/?user_id=${userId}`);

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || error.message || "Failed to get product by user ID."
      );
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    selectedProduct: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.products.push(action.payload);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.products.findIndex(product => product.id === action.payload.id);
        state.products[index] = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.error = null;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload.product;
        state.username = action.payload.username;
      })


      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(product => product.id !== action.payload.productId);
        state.loading = false;
        state.error = null;
      })

      .addCase(deleteProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getProductByUserId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductByUserId.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getProductByUserId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});


export default productSlice.reducer;
