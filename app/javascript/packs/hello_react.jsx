import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import { bindActionCreators } from 'redux';

import * as Actions from './actions/chat';
import configureStore from './store/configureStore';
import chat from './reducers/chat';

const store = configureStore();

// MainView
class ChatMain extends React.Component {
  // ActionCable
  componentDidMount() {
    // ビューのレンダリングが終わったら呼び出されるコールバックでチャンネルにケーブルを接続する
    this.subscriptChannel();
    this.props.fetchChannels()
  }

  subscriptChannel() {
    App.chat = App.cable.subscriptions.create(
      // チャンネルの種類とスライドのIDを指定。これがサーバー側にparamsとしてセットされる。
      { channel: "ChatChannel", chat_id: this.props.channels.id },
      {
        // ActionCableが接続されたときのコールバック
        connected() {
        },

        // ActionCableが切断されたときのコールバック
        disconnected() {
        },
        // ActionCableが受信したときのコールバック
        received(data) {
          // 受信したデータを解析して状態を更新する
          //this.props.onClick(data['comment'])
          store.dispatch(Actions.sendMessage(data['comment']))
        },
        speak(message) {
          // ケーブルを通してコメントを通知。サーバー側のspeakメソッドが呼び出される
          this.perform('speak', {message: message});
        }
      }
    );
    App.chat.received = App.chat.received.bind(this);
  }

  render() {
    return (
      <div className="main-container">
        <div className="side-menu">
          <ChannelDisplay channels={this.props.channels} channelClick={this.props.setChannels(this.props.channels)}/>
        </div>
        <div className="chat-area">
          <div className="chat-container">
            <ChatDisplay data={this.props.value} />
          </div>
          <div className="form-container">
            <FormInput />
          </div>
        </div>
      </div>
    );
  }
}
// 入力フォーム
class FormInput extends React.Component {
  send(e) {
    e.preventDefault();
    App.chat.speak(this.myInput.value);
    this.myInput.value = '';
    return;
  }
  render() {
    return (
      <form>
        <input type="text" ref={(ref) => (this.myInput = ref)} defaultValue="" />
        <button onClick={(event) => this.send(event)}>Send</button>
      </form>
    );
  }
}
// チャット表示部分
class ChatDisplay extends React.Component {
  render() {
    var key = 0;
    return (
      <ul>
        {this.props.data.map((textVal) =>
          <ChatLine textVal={textVal} key={key++} />
        )}
      </ul>
    );
  }
}
ChatDisplay.propTypes = {
  data: React.PropTypes.array,
};

// チャット表示
const ChatLine = props => (
  <li key={props.key}>{props.textVal}</li>
)

// チャンネル一覧
class ChannelDisplay extends React.Component {
  render() {
    return (
      <ul>
        {this.props.channels.map((channel) =>
          <ChannelLine textVal={channel.name} key={channel.id} channelClick={this.props.channelClick}/>
        )}
      </ul>
    );
  }
}
// チャンネル表示
const ChannelLine = props => (
  <li key={props.key}><a href="" onClick={props.channelClick}>{props.textVal}</a></li>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer name="React" />
    </Provider>,
    document.querySelector('.root-container'),
  )
})

// Connect to Redux
function mapStateToProps(state) {
  return {
    // propsを通して取得する際に使う名前: Storeのstateの値
    value: state.value,
    channels: state.channels,
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMain);
