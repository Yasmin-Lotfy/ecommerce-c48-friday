import { getAllProducts } from "@/services/products.services";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const productAction = createAsyncThunk(
  "product/getAllProducts",
  async () => {
    const response = await getAllProducts();
    return response.data;
  },
);

const initialState = {
  product: [],
  isLoading : true
};

export const ProductSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(productAction.pending, (state, action) => {
      console.log("pending");
      state.isLoading = true
    });

    builder.addCase(productAction.fulfilled, (state, action) => {
    //   console.log("fulfilled", action.payload);
      state.product = action.payload;
      state.isLoading = false
    });

    builder.addCase(productAction.rejected, (state, action) => {
      console.log("rejected");
      state.isLoading = false
    });
  },
});


export const ProductReducer = ProductSlice.reducer


