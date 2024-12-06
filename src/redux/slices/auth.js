import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const { data } = await axios.post(
      "http://localhost:5500/api/v1/users/login",
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
});
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    // console.log(user);
    try {
      const { data } = await axios.post(
        "http://localhost:5500/api/v1/users/signup",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);
      return data;
      
    } catch (err) {
      console.error(err);
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

export const checkToken = createAsyncThunk(
  "auth/checkToken",
  async (thunkAPI) => {
    try {
      const { data } = await axios.get("/auth/checktoken");
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
export const loadTokenFromLocalStorage = () => {
  const token = localStorage.getItem("authToken");
  if (token) {
    return token;
  }
  return null;
};

export const selectIsLoggedIn = (state) => {
  return Boolean(localStorage.getItem("authToken"));
};

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: loadTokenFromLocalStorage() ? true : false,
    user: {},
    token: loadTokenFromLocalStorage(),
    error: {
      status: "",
      success: false,
      message: "",
    },
    loading: false,
  },
  reducers: {
    Logout: (state) => {
      state.isLoggedIn = false;
      state.user = {};
      state.token = "";
      state.error = {};
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      localStorage.removeItem("businessId");
      localStorage.removeItem("businessFormData");
    },
    ClearError: (state) => {
      state.error.status = "";
      state.error.success = false;
      state.error.message = "";
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      console.log(action.payload);
      state.user = action.payload.data.user;
      state.isLoggedIn = true;
      state.token = action.payload.token;
      //set user to localStorege
      // const { authToken, userLogin } = action.payload;
      localStorage.setItem("authToken", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.data.user));
    },
    [login.rejected]: (state, action) => {
      const { error, status } = action.payload;
      const addErrorStatus = { ...error, status };
      state.loading = false;
      state.error = addErrorStatus;
      state.isLoggedIn = false;
    },
    [register.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isLoggedIn = true;
      // set user to localStorege
      const { token, user } = action.payload;
      console.log(action.payload);
      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
    },
    [register.rejected]: (state, action) => {
      const { error, status } = action.payload;
      const addErrorStatus = { ...error, status };
      state.loading = false;
      state.error = addErrorStatus;
      state.isLoggedIn = false;
    },
    [checkToken.pending]: (state) => {
      state.loading = true;
    },
    [checkToken.fulfilled]: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload.user;
      state.loading = false;
    },
    [checkToken.rejected]: (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = {};
    },
  },
});
const { reducer, actions, extraReducers } = authSlice;
export const { ClearError, Logout } = actions;
export default reducer;
