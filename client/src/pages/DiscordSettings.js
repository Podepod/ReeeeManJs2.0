import React, { Component } from "react";
import Redirect, { Toggle, Password, Text, ArrayTextList, Submit } from '../common/Forms';

class DiscordSettings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      settings: {
        basic: "",
        activity: "",
        log: "",
        userIDs: ""
      }
    };
  }

  callAPI() {
    fetch(`${process.env.REACT_APP_API_URL}/discord/settings`)
      .then(res => res.json())
      .then(res => this.setState({ settings: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
        <div className="formcontrolwrap DiscordSettings">
            <h1>Discord Settings</h1>
            <form action={`${process.env.REACT_APP_API_URL}/discord/settings`} method="POST" >
              {/* mogelijks opvangen met een functie ipv een action (handleSubmit functie die wordt uitgevoerd *onSumbit* met 'event.preventDefault();' op het einde v/d functie) */}
              {/* https://reactjs.org/docs/forms.html */}
              <Redirect page="discordSettings" /> {/* dan is die redirect uiteraard wel nimeer nodig... */}
              
              <div className="formblock">
                <h2>Basic</h2>
                <Password name="Token" id="basictoken" value={this.state.settings.basic.token} />
                <Text name="Prefix" id="basicprefix" value={this.state.settings.basic.prefix} />
                <Text name="Name" id="basicname" value={this.state.settings.basic.name} />
                <Text name="Description" id="basicdescription" value={this.state.settings.basic.description} />
                <Text name="Version" id="basicversion" value={this.state.settings.basic.version} />
                <Text name="Default Embed Color" id="basicdefaultColor" value={this.state.settings.basic.defaultColor} />
              </div>
              <div className="formblock">
                <h2>Activity <small>Ik denk dat ik dit nog moet maken voor de js versie</small></h2>
                <input type="hidden" name="activitystatus" value={this.state.settings.activity.status} />
                <p>Status moet select ding zijn --> make : {this.state.settings.activity.status}</p>
                <Text name="Text" id="activitytext" value={this.state.settings.activity.text} />
                <Text name="Stream Link" id="activitylink" value={this.state.settings.activity.link} />
                <Text name="Activity" id="activityactivity" value={this.state.settings.activity.activity} />
              </div>
              <div className="formblock">
                <h2>Logs</h2>
                <Toggle name="Stalking Enabled" id="logstalkingEnabled" value={this.state.settings.log.stalkingEnabled} /> 
                <Password name="Log Channel ID" id="logchannelID" value={this.state.settings.log.channelID} />
                <Password name="Stalk Channel ID" id="logstalkChannelID" value={this.state.settings.log.stalkChannelID} />
              </div>
              <div className="formblock">
                <h2>User IDs</h2>
                <Password name="Owner ID" id="userIDsowner" value={this.state.settings.userIDs.owner} />
                <Password name="Bot ID" id="userIDsbot" value={this.state.settings.userIDs.bot} />
              </div>

              <Submit name="Submit Changes" id="submit" />
            </form>
        </div>
    )
  }
}

export default DiscordSettings;
