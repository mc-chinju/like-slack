import axios from "axios";
import fetch from "isomorphic-fetch";

/* Actionsの実装 */

// Action名の定義
const SEND = "SEND";
const SET_CHANNELS = "SET_CHANNELS";
export const FETCH_CHANNELS = "FETCH_CHANNELS";
export const FETCH_CHANNELS_SUCCESS = "FETCH_CHANNELS_SUCCESS";
export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const ADD_CHANNEL = "ADD_CHANNEL";
export const ADD_CHANNEL_SUCCESS = "ADD_CHANNEL_SUCCESS";
export const INPUT_CHANNEL = "INPUT_CHANNEL";

export const FETCH_MESSAGES = "FETCH_MESSAGES";
export const FETCH_MESSAGES_SUCCESS = "FETCH_MESSAGES_SUCCESS";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const ADD_MESSAGE_SUCCESS = "ADD_MESSAGE_SUCCESS";

export const SWITCH_CHANNEL = "SWITCH_CHANNEL";
export const SWITCH_CHANNEL_SUCCESS = "SWITCH_CHANNEL_SUCCESS";

export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const UPDATE_MESSAGE_SUCCESS = "UPDATE_MESSAGE_SUCCESS";

const feedURL = "/channels.json";

// Action Creators

export function sendMessage(messages) {
  // Action
  return {
    type: SEND,
    messages,
  };
}
function requestChannels() {
  return {
    type: FETCH_CHANNELS
  };
}

function receiveChannels(json) {
  return {
    type: FETCH_CHANNELS_SUCCESS,
    channels: json
  };
}
export function fetchChannels() {
  return dispatch => {
    dispatch(requestChannels());
    return axios.get("/channels.json").then((response) => {
      dispatch(receiveChannels(response.data));
    }).catch((response) => {
      console.log(response);
    });
  };
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
    dispatch(addNewChannel());
    return axios.post("/channels.json",
      {
        enterprise_id: "1",
        owner_id: "1",
        name: channelTitle
      },{withCredentials:true}
    ).then((response) => {
      dispatch(fetchChannels());
      dispatch(addNewChannelSuccess());
    }).catch((response) => {
      console.log(response);
    });
  };
}
// メッセージ取得
export function fetchMessages() {
  return dispatch => {
    dispatch(requestMessages());
    return axios.get("/messages.json").then((response) => {
      dispatch(receiveMessages(response.data));
    }).catch((response) => {
      console.log(response);
    });
  };
}

function requestMessages() {
  return {
    type: FETCH_MESSAGES
  };
}

function receiveMessages(json) {
  return {
    type: FETCH_MESSAGES_SUCCESS,
    messages: json
  };
}

// メッセージ送信
function addNewMessage() {
  return {
    type: ADD_MESSAGE,
  };
}
function addNewMessageSuccess() {
  return {
    type: ADD_MESSAGE_SUCCESS,
  };
}
export function postMessage(messageBody) {
  return dispatch => {
    dispatch(addNewMessage());
    return axios.post("/messages.json",
      {
        body: messageBody
      },{withCredentials:true}
    ).then((response) => {
      //dispatch(fetchMessages());
      dispatch(addNewMessageSuccess());
    }).catch((response) => {
      console.log(response);
    });
  };
}


function requestUpdatingMessage(){
  return {
    type: UPDATE_MESSAGE,
  }
}
function updateMessageSuccess(message, id) {
  return {
    type: UPDATE_MESSAGE_SUCCESS,
    body: message,
    id: id
  };
}

export function updateMessage(messageBody, id) {
  return dispatch => {
    dispatch(requestUpdatingMessage());
    return axios.put(`/messages/${id}.json`,
      {
        body: messageBody
      },{withCredentials: true}
    ).then((response) => {
      let data = response.data;
      dispatch(updateMessageSuccess(data.body, data.id));
    }).catch((response) => {
      console.log(response);
    });
  }
}

// channel switch
function switchChannel() {
  return {
    type: SWITCH_CHANNEL,
  };
}
function switchChannelSuccess() {
  return {
    type: SWITCH_CHANNEL_SUCCESS,
  };
}
export function postSwitchChannel(channel_id) {
  return dispatch => {
    dispatch(switchChannel());
    return axios.put(`/channels/${channel_id}/switch.json`,
      {
        channel_id: channel_id
      },{withCredentials:true}
    ).then((response) => {
      dispatch(switchChannelSuccess());
      dispatch(fetchMessages());
    }).catch((response) => {
      console.log(response);
    });
  };
}
