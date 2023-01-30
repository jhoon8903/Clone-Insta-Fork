// index.js

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { CookiesProvider } from 'react-cookie';
import store from "./redux/config/configStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  //</CookiesProvider>
);