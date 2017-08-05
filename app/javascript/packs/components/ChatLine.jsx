import React from 'react';
// チャット表示
const ChatLine = props => (
  <li key={props.key}>{props.messageBody}</li>
);

export default ChatLine;
