import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],   
  quantity: 0,   
  total: 0,       
};

const recalcTotals = (state) => {
  state.quantity = state.products.reduce((sum, p) => sum + (p.quantity || 0), 0);
  state.total = state.products.reduce((sum, p) => sum + (p.price * (p.quantity || 0)), 0);
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    
    addProduct: (state, action) => {
      const incoming = action.payload;
      const idx = state.products.findIndex((p) => p._id === incoming._id);

      if (idx > -1) {
        state.products[idx].quantity += incoming.quantity || 1;
      } else {
        state.products.push({
          ...incoming,
          quantity: incoming.quantity || 1,
        });
      }
      recalcTotals(state);
    },

    increaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.products.find((p) => p._id === id);
      if (item) {
        item.quantity += 1;
        recalcTotals(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const id = action.payload;
      const item = state.products.find((p) => p._id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        recalcTotals(state);
      }
    },

    removeProduct: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((p) => p._id !== id);
      recalcTotals(state);
    },

    clearCart: (state) => {
      state.products = [];
      state.quantity = 0;
      state.total = 0;
    },
  },
});

export const {
  addProduct,
  increaseQuantity,
  decreaseQuantity,
  removeProduct,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
