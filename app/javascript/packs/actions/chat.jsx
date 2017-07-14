import axios from 'axios'
import fetch from 'isomorphic-fetch'



/* Actionsの実装 */

// Action名の定義
const SEND = 'SEND';
const SET_CHANNELS = 'SET_CHANNELS';
export const FETCH_CHANNELS = 'FETCH_CHANNELS'
export const FETCH_CHANNELS_SUCCESS = 'FETCH_CHANNELS_SUCCESS'

const feedURL = '/channels.json';

// Action Creators

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
    type: SET_CHANNELS,
    channels,
  };
}

function requestChannels() {
  return {
    type: FETCH_CHANNELS
  }
}

function receiveChannels(json) {
  return {
    type: FETCH_CHANNELS_SUCCESS,
    channels: json
  }
}
export function fetchChannels() {
  return dispatch => {
    dispatch(requestChannels())
    return axios.get('http://127.0.0.1:3000/channels.json').then((response) => {
        dispatch(receiveChannels(response.data))
      }).catch((response) => {
        console.log(response)
      })
  }
}
