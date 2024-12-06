import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    topRated: false,
    mostPopular: false,
    language: "",
    city: false,
    budget: 1000000,
    enabled: false,
    professionInput: "",
    name: "", // Use 'name' here
  },
  reducers: {
    addFilter: (state, action) => {
      const {
        topRated,
        mostPopular,
        language,
        city,
        budget,
        enabled,
        name, // Use 'name' here
      } = action.payload;
      state.topRated = topRated;
      state.mostPopular = mostPopular;
      state.language = language;
      state.city = city;
      state.budget = budget;
      state.enabled = enabled;
      state.name = name; // Use 'name' here
    },
    clearFilter: (state) => {
      state.topRated = false;
      state.mostPopular = false;
      state.language = "";
      state.city = false;
      state.budget = 1000000;
      state.enabled = false;
      state.name = ""; // Use 'name' here
    },
    setProfessionInput: (state, action) => {
      state.professionInput = action.payload;
    },
    setName: (state, action) => { // Use 'setName' here
      state.name = action.payload; // Use 'name' here
    },
  },
});

const { reducer, actions } = filterSlice;
export const { addFilter, clearFilter, setProfessionInput, setName } = actions; // Use 'setName' here
export default reducer;




