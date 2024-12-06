import { RouterProvider } from "react-router-dom";
import "./styles/app.scss";
import routes from "./router/routes";
import { ThemeProvider } from "@mui/material";
import { theme } from "./styles/MUITheme";
import { Provider } from "react-redux";
import { store } from './redux';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./index.css";
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <React.StrictMode>
          <ThemeProvider theme={theme}>
            <RouterProvider router={routes}></RouterProvider>
          </ThemeProvider>
        </React.StrictMode>
      </PersistGate>
    </Provider>
  );
}

export default App;
