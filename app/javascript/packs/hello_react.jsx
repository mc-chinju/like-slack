import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

import sendMessage from './actions/chat';
import configureStore from './store/configureStore';
import chat from './reducers/chat';

const store = configureStore();

// MainView
class ChatMain extends React.Component {
  // ActionCable
  componentDidMount() {
    // ビューのレンダリングが終わったら呼び出されるコールバックでチャンネルにケーブルを接続する
    this.subscriptChannel();
  }

  subscriptChannel() {
    App.chat = App.cable.subscriptions.create(
      // チャンネルの種類とスライドのIDを指定。これがサーバー側にparamsとしてセットされる。
      { channel: "ChatChannel", chat_id: 1 },
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
          this.props.setMessages(data['comment'])
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
        <div className="header-container">
          <h1>Hello {this.props.name}</h1>
        </div>
        <div className="chat-container">
          <ChatDisplay data={this.props.value} />
        </div>
        <div className="form-container">
          <FormInput handleClick={this.props.onClick} />
        </div>
      </div>
    );
  }
}
// 入力フォーム
class FormInput extends React.Component {
  send(e) {
    e.preventDefault();
    this.props.handleClick(this.myInput.value.trim());
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
FormInput.propTypes = {
  handleClick: React.PropTypes.func.isRequired,
};
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

const ChatLine = props => (
  <li key={props.key}>{props.textVal}</li>
)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer name="React" />
    </Provider>,
    document.querySelector('.container'),
  )
})

// Connect to Redux
function mapStateToProps(state) {
  return {
    // propsを通して取得する際に使う名前: Storeのstateの値
    value: state.value,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // propsを通して取得する際に使う名前
    // ここにメソッドを追加していく感じ？
    onClick(value) {
      // Storeのdispatchメソッド（引数はAction Creator）
      //dispatch(send(value));
      App.chat.speak(value);
    },
    setMessages(message) {
      dispatch(sendMessage(message));
    }
  };
}
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMain);
