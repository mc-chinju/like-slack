import React from "react";
import ChatDisplay from "../components/chat/ChatDisplay";
import ChannelDisplay from "../components/channel/ChannelDisplay";
import FormInput from "../components/chat/FormInput";
import Modal from "react-modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/chat";

const customStyles = {
  content : {
    top                   : "50%",
    left                  : "50%",
    right                 : "auto",
    bottom                : "auto",
    marginRight           : "-50%",
    transform             : "translate(-50%, -50%)"
  }
};

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
    this.props.fetchChannels();
    this.props.fetchMessages();
    this.props.postSwitchChannel("1");
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
          store.dispatch(Actions.sendMessage(data["comment"]));
        },
        speak(message) {
          // ケーブルを通してコメントを通知。サーバー側のspeakメソッドが呼び出される
          this.perform("speak", {message: message});
        }
      }
    );
    App.chat.received = App.chat.received.bind(this);
  }

  openModal() {
    this.props.openChannelModal();
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
    this.channelInput.value = "";
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
          <ChannelDisplay channels={this.props.channels} postSwitchChannel={this.props.postSwitchChannel}/>
        </div>
        <div className="chat-area">
          <div className="chat-container">
            <ChatDisplay messages={this.props.messages} />
          </div>
          <div className="form-container">
            <FormInput postMessage={this.props.postMessage}/>
          </div>
        </div>
      </div>
    );
  }
}

// Connect to Redux
function mapStateToProps(state) {
  return {
    // propsを通して取得する際に使う名前: Storeのstateの値
    messages: state.messages,
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

export default AppContainer;
