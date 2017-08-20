import { SEND } from "../actions/chat";

const initialState = {
  messages: [],
  channels: [],
  isFetching: false,
  modalIsOpen: false,
  channelName: ""
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case "SEND":
      return Object.assign({}, state, {
        messages: state.messages.concat(action.messages),
      });
    case "FETCH_CHANNELS":
      return Object.assign({}, state, {
        isFetching: true
      });
    case "FETCH_CHANNELS_SUCCESS":
      return Object.assign({}, state, {
        isFetching: false,
        channels: action.channels
      });
    case "OPEN_MODAL":
      return Object.assign({}, state, {
        modalIsOpen: true
      });
    case "CLOSE_MODAL":
      return Object.assign({}, state, {
        modalIsOpen: false
      });

    case "ADD_CHANNEL":
      return Object.assign({}, state, {
        isFetching: true
      });
    case "ADD_CHANNEL_SUCCESS":
      return Object.assign({}, state, {
        isFetching: false,
      });

    case "FETCH_MESSAGES":
      return Object.assign({}, state, {
        isFetching: true
      });
    case "FETCH_MESSAGES_SUCCESS":
      return Object.assign({}, state, {
        isFetching: false,
        messages: action.messages
      });

    case "ADD_MESSAGE":
      return Object.assign({}, state, {
        isFetching: true
      });
    case "ADD_MESSAGE_SUCCESS":
      return Object.assign({}, state, {
        isFetching: false,
      });

    case "SWITCH_CHANNEL":
      return Object.assign({}, state, {
        isFetching: true
      });
    case "SWITCH_CHANNEL_SUCCESS":
      return Object.assign({}, state, {
        isFetching: false,
      });
    case "UPDATE_MESSAGE":
      return Object.assign({}, state, {
        isFetching: true,
      });
    case "UPDATE_MESSAGE_SUCCESS":
      let messages = state.messages.map((m)=>{
        return message(m, action);
      });
      return Object.assign({}, state, {
        isFetching: false,
        messages
      });
    default:
      return state;
  }
}

const message = function(state, action) {
  switch (action.type) {
    case "UPDATE_MESSAGE_SUCCESS":
      if(state.id !== action.id){
        return state;
      }
      return Object.assign({}, state, {
        body: action.body
      });
    default:
      return state;
  }
}
