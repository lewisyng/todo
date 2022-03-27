import React from "react";
import ReactDOM from "react-dom";
import "./index.sass";
import App from "./components/app/App";
import { Provider } from "react-redux";
import { store } from "./store/store/index";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
