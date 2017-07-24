import React from 'react'
import ChannelLine from './ChannelLine';
// チャンネル一覧
class ChannelDisplay extends React.Component {
  render() {
    return (
      <ul>
        {this.props.channels.map((channel) =>
          <ChannelLine textVal={channel.name} key={channel.id} channelId={channel.id} postSwitchChannel={this.props.postSwitchChannel}/>
        )}
      </ul>
    );
  }
}

export default ChannelDisplay
