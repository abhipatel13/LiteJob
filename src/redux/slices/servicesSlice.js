// servicesSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const servicesSlice = createSlice({
  name: 'services',
  initialState: [],
  reducers: {
    addService: (state, action) => {
      // Add the new service to the state
      state.push(action.payload);
    },
  },
});

export const { addService } = servicesSlice.actions;

export default servicesSlice.reducer;
