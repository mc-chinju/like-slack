import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Modal from 'react-modal';

import { bindActionCreators } from 'redux';

import * as Actions from './actions/chat';
import configureStore from './store/configureStore';
import chat from './reducers/chat';

const store = configureStore();

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

// MainView
class ChatMain extends React.Component {
  constructor() {
    super();
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
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


  openModal() {
    this.props.openChannelModal()
  }
  afterOpenModal() {
    // references are now sync'd and can be accessed.
  }
  closeModal() {
    this.props.closeChannelModal();
  }
  channelCreate(e) {
    e.preventDefault();
    this.props.postChannel(this.channelInput.value);
    this.channelInput.value = '';
    this.closeModal();
    return;
  }

  render() {
    return (
      <div className="main-container">
        <Modal
          isOpen={this.props.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          >

          <h2 ref={subtitle => this.subtitle = subtitle}>チャンネル作成</h2>
          <form>
            <input  type="text" ref={(ref) => (this.channelInput = ref)} defaultValue=""/>
            <button onClick={(event) => this.channelCreate(event)}>Send</button>
          </form>
          <button onClick={this.closeModal}>閉じる</button>
        </Modal>

        <div className="side-menu">
          <button onClick={this.openModal}>＋ チャンネル作成</button>
          <ChannelDisplay channels={this.props.channels} />
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
          <ChannelLine textVal={channel.name} key={channel.id} />
        )}
      </ul>
    );
  }
}
// チャンネル表示
const ChannelLine = props => (
  <li key={props.key}>{props.textVal}</li>
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
    modalIsOpen: state.modalIsOpen,
    isFetching: state.isFetching,
    channelName: state.channelName
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMain);
