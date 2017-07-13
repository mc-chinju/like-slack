import { SEND } from '../actions/chat';

const initialState = {
  value: [],
  channels: [],
  isFetching: false,
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case 'SEND':
    return Object.assign({}, state, {
      value: state.value.concat(action.value),
    });
    case 'GET_CHANNELS':
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

    default:
    return state;
  }
}
