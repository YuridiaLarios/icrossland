import React, {Component} from "react";


class Secret extends Component {
  render() {
    return (
      <div>
        <p>This is a super secret area. Jump back to <a href="/">Home</a></p>
        <br />
        <button onClick={this.props.auth.logout}>Logout</button>
      </div>
    )
  }
}


export default Secret;