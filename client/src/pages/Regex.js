import React, { Component } from "react";

class Regex extends Component {
  constructor(props) {
    super(props);
    this.state = {apiResponse: ""};
  }

  callAPI() {
    fetch('http://10.30.20.187:4005/api/bot/settings') // fix dit naar dynamisch ip adres
      .then(res => res.json())
      .then(res => this.setState({ apiResponse: res.data.basic.name }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
        <div className="Regex">
            <p>{this.state.apiResponse}</p>
        </div>
    )
  }
}

export default Regex;
