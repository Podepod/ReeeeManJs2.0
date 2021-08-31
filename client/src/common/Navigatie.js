import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './Navigatie.css';

class NavLogo extends Component {
    render() {
        return (
            <li className="navItem logo">
                <Link to="/">
                    <img src={process.env.PUBLIC_URL + "/image/discordLogo.png"} alt="logo" />
                </Link>
            </li>
        )
    }
}

class NavLink extends Component {
    constructor(props){
        super(props);
        this.state = {
            link: props.item.link,
            id: 'nav' + props.item.title,
            name: props.item.title,
            position: props.item.position
        }
    }

    render() {
        if (this.state.position !== 'undefined' && this.state.position == "right"){
            return (
                <li className="navItem navRight">
                    <Link 
                        to={this.state.link}
                        id={this.state.id}
                    >
                        {this.state.name}
                    </Link>
                </li>
            )
        }

        return (
            <li className="navItem">
                <Link 
                    to={this.state.link}
                    id={this.state.id}
                >
                    {this.state.name}
                </Link>
            </li>
        )
    }
}

class Navigatie extends Component {
  constructor(props) {
    super(props);
    this.state = {
        page: props.page,
        navPages: []
    };
  }

  callAPI() {
    fetch(`${process.env.REACT_APP_API_URL}/nav`) // fix dit naar dynamisch ip adres
      .then(res => res.json())
      .then(res => this.setState({ navPages: res }));
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <nav>
          <ul className="navList">
            <NavLogo key="-1" />
            {this.state.navPages.filter((item) => {
                return !item.hidden.nav
            }).map((item) => (
                <NavLink item={item} key={item.name} />
            ))}
          </ul>
      </nav>
    )
  }
}

export default Navigatie;