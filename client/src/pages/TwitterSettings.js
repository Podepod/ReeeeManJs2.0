import React, { Component } from "react";
import Redirect, { Toggle, Password, ArrayTextList, Submit } from '../common/Forms';

class TwitterSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {settings: ""};
  }

  callAPI() {
    fetch(`${process.env.REACT_APP_API_URL}/twitter/settings`)
      .then(res => res.json())
      .then(res => this.setState({ settings: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
        <div className="formcontrolwrap TwitterSettings">
          <h1>Twitter Settings</h1>
            <form action={`${process.env.REACT_APP_API_URL}/twitter/settings`} method="POST"> 
            {/* mogelijks opvangen met een functie ipv een action (handleSubmit functie die wordt uitgevoerd *onSumbit* met 'event.preventDefault();' op het einde v/d functie) */}
            {/* https://reactjs.org/docs/forms.html */}
            {/* https://jasonwatmore.com/post/2020/02/01/react-fetch-http-post-request-examples --> post request met nodejs */}
              <Redirect page="twitterSettings" /> {/* dan is die redirect uiteraard wel nimeer nodig... */}
                
              <div className="formblock">
                <h2>Toggles</h2>
                <Toggle name="Enable Twitter module" id="enabled" value={this.state.settings.enabled} />
                <Toggle name="Only owner can use the Twitter module" id="ownerOnly" value={this.state.settings.ownerOnly} />
                <Toggle name="Only certain 'admins' can use the Twitter module" id="adminOnly" value={this.state.settings.adminOnly} />                
              </div>

              <div className="formblock">
                <h2>Keys</h2>
                <Password name="Api Key" id="apiKey" value={this.state.settings.apiKey} />
                <Password name="Api Secret Key" id="apiSecretKey" value={this.state.settings.apiSecretKey} />
                <Password name="Access Token" id="accessToken" value={this.state.settings.accessToken} />
                <Password name="Access Token Secret" id="accessTokenSecret" value={this.state.settings.accessTokenSecret} />
                <Password name="Bearer Token" id="bearerToken" value={this.state.settings.bearerToken} />
              </div>
              <Submit name="Submit Changes" id="submit" />
            </form>
            <form>
              <div className="formblock">
                <h2>Admins</h2>
                {/* list met admins (remove & edit knop erbij) + een add button onderaan */}
                {console.log(this.state.settings.admins)}
                <ArrayTextList listItems={this.state.settings.admins} />
              </div>
            </form>
        </div>
    )
  }
}

export default TwitterSettings;
