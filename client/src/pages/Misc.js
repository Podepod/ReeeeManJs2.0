import React, { Component } from "react";

class Misc extends Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: ""};
  }

  callAPI() {
    fetch(`${process.env.REACT_APP_API_URL}/discord/settings`)
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res.basic.name }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
        <div className="Misc">
            <p>{this.state.apiResponse}</p>
        </div>
    )
  }
}

export default Misc;
