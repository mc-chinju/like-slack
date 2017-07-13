import { SEND } from '../actions/chat';

const initialState = {
  value: [],
  channels: [],
};

export default function chat(state = initialState, action) {
  switch (action.type) {
    case 'SEND':
    return Object.assign({}, state, {
      value: state.value.concat(action.value),
    });
    case 'GET_CHANNELS':
    return Object.assign({}, state, {
      channels: action.value,
    });
    default:
    return state;
  }
}
