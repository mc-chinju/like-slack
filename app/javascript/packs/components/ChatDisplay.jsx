import React from 'react'
import PropTypes from 'prop-types'
import ChatLine from './ChatLine';
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

export default ChatDisplay
