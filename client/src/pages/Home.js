import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Home.css';

class HomeCard extends Component {
  constructor(props) {
    super(props);

    this.state= {
      title: props.data.title,
      link: props.data.link,
      icon: props.data.icon
    }
  }

  render() {
    return (
      <Link className="HomeCard" to={this.state.link}>
        <img src={process.env.PUBLIC_URL + '/image/' + this.state.icon} alt={this.state.title + ' icon.'} />
        <h2>{this.state.title}</h2>
      </Link>
    )
  }
}

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pages: []
    };
  }

  callAPI() {
    fetch(`${process.env.REACT_APP_API_URL}/nav`)
      .then(res => res.json())
      .then(res => this.setState({ pages: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
        <div className="Home">
          {this.state.pages.filter((item) => {
            return !item.hidden.home
          }).map((item) => (
            <HomeCard data={item} />
          ))}
        </div>
    )
  }
}

export default Home;
