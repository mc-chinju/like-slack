import axios from 'axios'
import fetch from 'isomorphic-fetch'
import * as constants from "./ChatConstants";

// Action Creators
export function sendMessage(messages) {
  return {
    type: constants.SEND_MESSAGE,
    messages,
  };
}
function requestChannels() {
  return {
    type: constants.FETCH_CHANNELS
  }
}

function receiveChannels(json) {
  return {
    type: constants.FETCH_CHANNELS_SUCCESS,
    channels: json
  }
}
export function fetchChannels() {
  return dispatch => {
    dispatch(requestChannels())
    return axios.get('/channels.json').then((response) => {
        dispatch(receiveChannels(response.data))
      }).catch((response) => {
        console.log(response)
      })
  }
}

function addNewChannel() {
  return {
    type: constants.ADD_CHANNEL,
  };
}
function addNewChannelSuccess() {
  return {
    type: constants.ADD_CHANNEL_SUCCESS,
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
        dispatch(fetchChannels())
        dispatch(addNewChannelSuccess())
      }).catch((response) => {
        console.log(response)
      })
  }
}
// メッセージ取得
export function fetchMessages() {
  return dispatch => {
    dispatch(requestMessages())
    return axios.get('/messages.json').then((response) => {
        dispatch(receiveMessages(response.data))
      }).catch((response) => {
        console.log(response)
      })
  }
}

function requestMessages() {
  return {
    type: constants.FETCH_MESSAGES
  }
}

function receiveMessages(json) {
  return {
    type: constants.FETCH_MESSAGES_SUCCESS,
    messages: json
  }
}

// メッセージ送信
function addNewMessage() {
  return {
    type: constants.ADD_MESSAGE,
  };
}
function addNewMessageSuccess() {
  return {
    type: constants.ADD_MESSAGE_SUCCESS,
  };
}
export function postMessage(messageBody) {
  return dispatch => {
    dispatch(addNewMessage())
    return axios.post('/messages.json',
    {
      body: messageBody
    },{withCredentials:true}
    ).then((response) => {
        dispatch(fetchMessages())
        dispatch(addNewMessageSuccess())
      }).catch((response) => {
        console.log(response)
      })
  }
}

// channel switch
function switchChannel() {
  return {
    type: constants.SWITCH_CHANNEL,
  };
}
function switchChannelSuccess() {
  return {
    type: constants.SWITCH_CHANNEL_SUCCESS,
  };
}
export function postSwitchChannel(channel_id) {
  return dispatch => {
    dispatch(switchChannel())
    return axios.put(`/channels/${channel_id}/switch.json`,
    {
      channel_id: channel_id
    },{withCredentials:true}
    ).then((response) => {
        dispatch(switchChannelSuccess())
        dispatch(fetchMessages())
      }).catch((response) => {
        console.log(response)
      })
  }
}
