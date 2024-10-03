import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./services/store";
// import filterReducer from "./reducers/filterReducer";
// import { configureStore } from "@reduxjs/toolkit";
// import noteReducer from "./reducers/noteReducer";

// const store = configureStore({
//   reducer: {
//     notes: noteReducer,
//     filter: filterReducer,
//   },
// });

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
