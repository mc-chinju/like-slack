import ChatMain from "./../components/ChatMain";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "./../actions/chat";

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
