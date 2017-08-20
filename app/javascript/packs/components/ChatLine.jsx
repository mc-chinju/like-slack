import React from "react";
// チャット表示

class ChatLine extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {editing: false};
  }
  toggleEditing() {
    this.setState({editing: !this.state.editing});
  }
  render() {
    if(this.state.editing) {
      return (
        <div className="editing-form-container">
          <form>
            <input type="text" value={this.props.messageBody}/>
            <button className="update">Update</button>
            <button className="cancel" onClick={(event)=> {this.toggleEditing();}}>Cancel</button>
          </form>
        </div>
      );
    } else {
      return (
        <li key={this.props.messageKey} onClick={(event)=> this.toggleEditing()}>{this.props.messageBody}</li>
      );
    }
  }
}

export default ChatLine;
