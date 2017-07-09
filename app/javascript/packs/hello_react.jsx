import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

/* Actionsの実装 */

// Action名の定義
const SEND = 'SEND';

// Action Creators
function send(value) {
  // Action
  return {
    type: SEND,
    value,
  };
}

// MainView
class ChatMain extends React.Component {
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
    return (
      <div>入力値⇒{this.props.data}</div>
    );
  }
}
ChatDisplay.propTypes = {
  data: React.PropTypes.string,
};

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer name="React" />
    </Provider>,
    document.querySelector('.container'),
  )
})

/* Reducersの実装 */
function formReducer(state, action) {
  switch (action.type) {
    case 'SEND':
      return Object.assign({}, state, {
        value: action.value,
      });
    default:
      return state;
  }
}

/* Storeの実装 */

const initialState = {
  value: null,
};
const store = createStore(formReducer, initialState);

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
    onClick(value) {
      // Storeのdispatchメソッド（引数はAction Creator）
      dispatch(send(value));
    },
  };
}
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMain);
