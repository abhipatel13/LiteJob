import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const businessLogin = createAsyncThunk(
  "business/auth/login",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5500/api/v1/business/auth/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          error: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          error: {
            success: false,
            message: "Network Error",
          },
        });
      }
    }
  }
);

export const businessRegister = createAsyncThunk(
  "business/auth/register",
  async (user, thunkAPI) => {
    try {
      const { data } = await axios.post(
        "http://localhost:5500/api/v1/business/auth/signup",
        user,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (err) {
      if (err.response && err.response.data) {
        return thunkAPI.rejectWithValue({
          error: err.response.data,
          status: err.response.status,
        });
      } else {
        return thunkAPI.rejectWithValue({
          error: {
            success: false,
            message: "Network Error",
          },
        });
      }
    }
  }
);

const businessAuthSlice = createSlice({
  name: "businessAuth",
  initialState: {
    isLoggedIn: false,
    user: {},
    token: null,
    error: {
      status: "",
      success: false,
      message: "",
    },
    loading: false,
  },
  reducers: {
    businessLogout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      state.token = null;
      state.error = {};
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
    },
    clearBusinessError: (state) => {
      state.error.status = "";
      state.error.success = false;
      state.error.message = "";
    },
  },
  extraReducers: {
    [businessLogin.pending]: (state) => {
      state.loading = true;
    },
    [businessLogin.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.data.user;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem(
        "user",
        JSON.stringify(action.payload.data.businessUser)
      );
    },
    [businessLogin.rejected]: (state, action) => {
      const { error, status } = action.payload;
      const addErrorStatus = { ...error, status };
      state.loading = false;
      state.error = addErrorStatus;
      state.isLoggedIn = false;
    },
    [businessRegister.pending]: (state) => {
      state.loading = true;
    },
    [businessRegister.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      const { token} = action.payload;
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(action.payload.data.businessUser));
    },
    [businessRegister.rejected]: (state, action) => {
      const { error, status } = action.payload;
      const addErrorStatus = { ...error, status };
      state.loading = false;
      state.error = addErrorStatus;
      state.isLoggedIn = false;
    },
  },
});

const { reducer, actions } = businessAuthSlice;
export const { clearBusinessError, businessLogout } = actions;
export default reducer;
