import { createSlice } from "@reduxjs/toolkit";

const businessSlice = createSlice({
  name: "business",
  initialState: {
    id: null,
    title: null,
    desc: null,
    rating: null,
    businessAuth: null,
    businessCity: null,
  },
  reducers: {
    setBusinessDetails: (state, action) => {
      state.id = action.payload.id;
      state.title = action.payload.title;
      state.desc = action.payload.desc;
      state.rating = action.payload.rating;
      state.businessAuth = action.payload.businessAuth;
      state.businessCity = action.payload.businessCity;
    },
  },
});

export const { setBusinessDetails } = businessSlice.actions;

export default businessSlice.reducer;
