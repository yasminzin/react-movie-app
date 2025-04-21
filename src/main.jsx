import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import store from "./store/store.js";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import createAxiosInstance from "./apis/config";

const axiosInstance = createAxiosInstance(store);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App axiosInstance={axiosInstance} />
  </Provider>
);
