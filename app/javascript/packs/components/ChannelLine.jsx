import React from "react";
// チャンネル表示
class ChannelLine extends React.Component {
  send(e) {
    e.preventDefault();
    this.props.postSwitchChannel(this.props.channelId);
    return;
  }
  render() {
    return (
      <li key={this.props.channelId}><a onClick={(event) => this.send(event)}>{this.props.textVal}</a></li>
    );
  }
}

export default ChannelLine;
