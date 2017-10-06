import React from "react";
import PropTypes from "prop-types";
import ChatLine from "./ChatLine";
// チャット表示部分
class ChatDisplay extends React.Component {
  render() {
    var key = 0;
    return (
      <ul>
        {this.props.messages.map((message) =>
          <ChatLine messageBody={message.body} key={message.id} />
        )}
      </ul>
    );
  }
}
ChatDisplay.propTypes = {
  messages: React.PropTypes.array,
};

export default ChatDisplay;
