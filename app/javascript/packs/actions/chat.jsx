import axios from 'axios'
import fetch from 'isomorphic-fetch'



/* Actionsの実装 */

// Action名の定義
const SEND = 'SEND';
const SET_CHANNELS = 'SET_CHANNELS';
export const FETCH_CHANNELS = 'FETCH_CHANNELS'
export const FETCH_CHANNELS_SUCCESS = 'FETCH_CHANNELS_SUCCESS'
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'
export const ADD_CHANNEL = 'ADD_CHANNEL'
export const ADD_CHANNEL_SUCCESS = 'ADD_CHANNEL_SUCCESS'
export const INPUT_CHANNEL = 'INPUT_CHANNEL'


const feedURL = '/channels.json';

// Action Creators

export function sendMessage(value) {
  // Action
  return {
    type: SEND,
    value,
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

export function openChannelModal() {
  return {
    type: OPEN_MODAL,
  };
}
export function closeChannelModal() {
  return {
    type: CLOSE_MODAL,
  };
}
function addNewChannel() {
  return {
    type: ADD_CHANNEL,
  };
}
function addNewChannelSuccess() {
  return {
    type: ADD_CHANNEL_SUCCESS,
  };
}
export function postChannel(channelTitle) {
  return dispatch => {
    dispatch(addNewChannel())
    return axios.post('/channels.json',
    {
      enterprise_id: '1',
      owner_id: '1',
      name: channelTitle
    },{withCredentials:true}
    ).then((response) => {
        dispatch(addNewChannelSuccess())
      }).catch((response) => {
        console.log(response)
      })
  }
}
