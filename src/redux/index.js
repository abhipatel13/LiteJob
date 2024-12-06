import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";

import authReducer from "./slices/auth";
import filterReducer from "./slices/filter";
import businessauthReducer from "./slices/businessauth";
import selectedServicesReducer from "./slices/cart";
import businessReducer from "./slices/businessSlice";
import businessFormDataReducer from "./slices/businessFormDataSlice";
import chatWindowReducer from "./slices/chatWindowSlice";
import servicesReducer from "./slices/servicesSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  auth: authReducer,
  filter: filterReducer,
  businessauth: businessauthReducer,
  selectedServices: selectedServicesReducer,
  business: businessReducer,
  businessFormData: businessFormDataReducer,
  chatWindow: chatWindowReducer,
  services: servicesReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
