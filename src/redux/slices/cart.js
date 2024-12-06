import { createSlice } from "@reduxjs/toolkit";

const selectedServicesSlice = createSlice({
  name: "selectedServices",
  initialState: [],
  reducers: {
    addService: (state, action) => {
      const { id, name, price } = action.payload;
      const existingService = state.find((service) => service.id === id);
      if (existingService) {
        existingService.quantity += 1;
        existingService.totalPrice += price;
      } else {
        state.push({ id, name, price, quantity: 1, totalPrice: price });
      }
    },
    removeService: (state, action) => {
      const id = action.payload;
      return state.filter((service) => service.id !== id);
    },
  },
});

const { reducer, actions } = selectedServicesSlice;
export const { addService, removeService } = actions;
export default reducer;

