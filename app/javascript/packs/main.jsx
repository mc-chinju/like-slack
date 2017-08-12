import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { createStore } from "redux";
import { Provider, connect } from "react-redux";

import { bindActionCreators } from "redux";

import * as Actions from "./actions/chat";
import configureStore from "./store/configureStore";
import chat from "./reducers/chat";
// Components
import ChatMain from "./components/chat/ChatMain";

const store = configureStore();

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer name="React" />
    </Provider>,
    document.querySelector(".root-container")
  );
});

// Connect to Redux
function mapStateToProps(state) {
  return {
    // propsを通して取得する際に使う名前: Storeのstateの値
    messages: state.messages,
    channels: state.channels,
    modalIsOpen: state.modalIsOpen,
    isFetching: state.isFetching,
    channelName: state.channelName
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMain);
