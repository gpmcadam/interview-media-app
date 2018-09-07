import React, { Component } from 'react';

import './App.css';
import LoginForm from './LoginForm'
import { logOut, verifyToken } from './auth'

class App extends Component {

  state = {
    loggedIn: false,
    user: null
  }

  componentDidMount() {
    verifyToken()
      .then((token) => {
        this.setState({
          loggedIn: true,
          user: token.user.name
        })
      })
      .catch(() => {
        this.setState({
          loggedIn: false,
          user: null
        })
      })
  }

  logOut = () => {
    logOut()
      .then(() => {
        this.setState({
          loggedIn: false,
          user: null
        })
      })
  }

  onLoginSuccess = (token) => {
    this.setState({
      loggedIn: true,
      user: token.user.name
    })
  }

  render() {
    return (
      <div className="app">
        <header className="app__header">
          <h1 className="app__title">Media Manager</h1>
        </header>
        {this.state.loggedIn ? <div>Welcome back, {this.state.user} <button onClick={this.logOut}>Log Out</button></div> : <LoginForm onLoginSuccess={this.onLoginSuccess} />}
      </div>
    );
  }
}

export default App;
