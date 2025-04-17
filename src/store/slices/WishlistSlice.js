import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    value: JSON.parse(localStorage.getItem("wishlist")) || [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.value.find((item) => item.id == action.payload.id)
        ? null
        : state.value.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.value));
    },
    removeFromWishlsit: (state, action) => {
      state.value = state.value.filter(
        (movie) => movie.id != action.payload.id
      );
      localStorage.setItem("wishlist", JSON.stringify(state.value));
    },
    deleteAllFromWishlist: (state) => {
      state.value = [];
    },
  },
});

export const { addToWishlist, removeFromWishlsit, deleteAllFromWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
