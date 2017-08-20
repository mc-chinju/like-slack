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
  send(e) {
    e.preventDefault();
    // TODO: エラーメッセージの表示
    if (!this.myInput.value.trim()) { return; }
    this.props.updateMessage(this.myInput.value, this.props.messageKey);
    this.myInput.value = "";
    this.toggleEditing();
    return;
  }
  render() {
    if(this.state.editing) {
      return (
        <div className="editing-form-container">
          <form>
            <input type="text" ref={(ref) => (this.myInput = ref)} defaultValue={this.props.messageBody}/>
            <button className="update" onClick={(event)=> {this.send(event)}}>Update</button>
            <button className="cancel" onClick={(event)=> {this.toggleEditing();}}>Cancel</button>
          </form>
        </div>
      );
    } else {
      return (
        <li id={this.props.messageKey} onClick={(event)=> this.toggleEditing()}>{this.props.messageBody}</li>
      );
    }
  }
}

export default ChatLine;
