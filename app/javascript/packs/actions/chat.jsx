import axios from 'axios'

/* Actionsの実装 */

// Action名の定義
const SEND = 'SEND';
const GET_CHANNELS = 'GET_CHANNELS';

const feedURL = '/channels.json';

// Action Creators
const getJSON = () => {
  return {
    type: 'FETCH_FEEDS'
  };
};

export function sendMessage(value) {
  // Action
  return {
    type: SEND,
    value,
  };
}

export function setChannels(channels) {
  // Action
  return {
    type: GET_CHANNELS,
    channels,
  };
}

const fetchData = (URL) => {
  return (dispatch) => {
    dispatch(getJSON());
    return axios.get(URL).then((res) => {
      dispatch(setChannels(res.data));
    }),(err) => {
      console.log(err);
    };
  };
};

export function fetchFeeds() {
  return (dispatch, getState) => {
    return dispatch(fetchData(feedURL));
  };
}
