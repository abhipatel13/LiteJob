// slices/businessSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  businessFormData: {},
};

const businessFormDataSlice = createSlice({
    name: "businessFormData",
    initialState,
    reducers: {
      updateBusinessFormData(state, action) {
        state.businessFormData = { ...action.payload };
      },
    },
  });
  

export const { updateBusinessFormData } = businessFormDataSlice.actions;
export default businessFormDataSlice.reducer;
