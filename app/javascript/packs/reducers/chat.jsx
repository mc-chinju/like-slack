import { SEND } from '../actions/chat';

const initialState = {
  value: [],
  channels: [],
  isFetching: false,
  modalIsOpen: false,
  channelName: ''
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case 'SEND':
    return Object.assign({}, state, {
      value: state.value.concat(action.value),
    });
    case 'SET_CHANNELS':
    return Object.assign({}, state, {
      channels: action.channels,
    });

    case 'FETCH_CHANNELS':
    return Object.assign({}, state, {
      isFetching: true
    });
    case 'FETCH_CHANNELS_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
      channels: action.channels
    });
    case 'OPEN_MODAL':
    return Object.assign({}, state, {
      modalIsOpen: true
    });
    case 'CLOSE_MODAL':
    return Object.assign({}, state, {
      modalIsOpen: false
    });

    case 'ADD_CHANNEL':
    return Object.assign({}, state, {
      isFetching: true
    });
    case 'ADD_CHANNEL_SUCCESS':
    return Object.assign({}, state, {
      isFetching: false,
    });
    case 'INPUT_CHANNEL':
    return Object.assign({}, state, {
      channelName: actions.channelName,
    });
    default:
    return state;
  }
}
