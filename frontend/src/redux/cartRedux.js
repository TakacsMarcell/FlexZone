import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],   
  quantity: 0,   
  total: 0,       
};

// egyedi kulcs képzés (termékvariáns azonosító)
const getKey = (p) => `${p._id}_${p.quantitygram || ""}`;

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
      const key = getKey(incoming);

      const idx = state.products.findIndex((p) => getKey(p) === key);

      if (idx > -1) {
        // ha teljesen ugyanaz a variáns (azonos kiszerelés) → összevonjuk
        state.products[idx].quantity += incoming.quantity || 1;
      } else {
        // új variáns → új sor
        state.products.push({
          ...incoming,
          quantity: incoming.quantity || 1,
        });
      }
      recalcTotals(state);
    },

    increaseQuantity: (state, action) => {
      const key = action.payload;
      const item = state.products.find((p) => getKey(p) === key);
      if (item) {
        item.quantity += 1;
        recalcTotals(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const key = action.payload;
      const item = state.products.find((p) => getKey(p) === key);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        recalcTotals(state);
      }
    },

    removeProduct: (state, action) => {
      const key = action.payload;
      state.products = state.products.filter((p) => getKey(p) !== key);
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
