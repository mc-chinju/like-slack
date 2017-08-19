import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { createStore } from "redux";
import { Provider } from "react-redux";

import configureStore from "./store/configureStore";
import chat from "./reducers/chat";
import AppContainer from "./containers/appContainer";

const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer name="React" />
    </Provider>,
    document.querySelector(".root-container")
  );
});
