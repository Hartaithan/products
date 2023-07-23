import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ICartItem, ICartState } from '../models/CartModel';

const initialState: ICartState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCartItem: (state, action: PayloadAction<ICartItem>) => {
      const item = state.items.find(i => i.item.id === action.payload.item.id);
      if (item) {
        item.quantity = item.quantity + action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },
    removeCartItem: (state, action: PayloadAction<ICartItem>) => {
      const filtered = state.items.filter(
        i => i.item.id !== action.payload.item.id,
      );
      state.items = filtered;
    },
    incrementQuantity: (state, action: PayloadAction<ICartItem>) => {
      const item = state.items.find(i => i.item.id === action.payload.item.id);
      if (item) item.quantity++;
    },
    decrementQuantity: (state, action: PayloadAction<ICartItem>) => {
      const item = state.items.find(i => i.item.id === action.payload.item.id);
      if (item && item.quantity > 1) {
        item.quantity--;
      } else if (item && item.quantity === 1) {
        const filtered = state.items.filter(
          i => i.item.id !== action.payload.item.id,
        );
        state.items = filtered;
      }
    },
  },
});

export const {
  addCartItem,
  removeCartItem,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
