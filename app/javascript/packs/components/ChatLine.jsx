import React from 'react'
// チャット表示
const ChatLine = props => (
  <li key={props.key}>{props.textVal}</li>
)

export default ChatLine
