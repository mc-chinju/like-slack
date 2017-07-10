import { SEND } from '../actions/chat';

export default function chat(state, action) {
  switch (action.type) {
    case 'SEND':
    return Object.assign({}, state, {
      value: state.value.concat(action.value),
    });
    default:
    return state;
  }
}
