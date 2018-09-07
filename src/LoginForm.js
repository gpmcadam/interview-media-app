import React, { Component } from 'react';

import { login } from './auth'

class LoginForm extends Component {

  onSubmit = e => {
    e.preventDefault()
    const user = e.target.user.value
    const password = e.target.password.value
    login(user, password)
      .then((res) => {
        this.props.onLoginSuccess(res)
      })
      .catch((e) => {
        console.error(e)
        alert('login failed try again')
      })
  }

  render() {
    return (
      <div>
        <form className="app__login" onSubmit={this.onSubmit}>
          <fieldset style={{ border: 0 }}>
            <label style={{ display: 'block', marginBottom: 10 }}>
              <div style={{ width: 120, display: 'inline-block', textAlign: 'left' }}>User</div>
              <input type="text" name="user" />
            </label>
            <label style={{ display: 'block' }}>
              <div style={{ width: 120, display: 'inline-block', textAlign: 'left' }}>Password</div>
              <input type="password" name="password" />
            </label>
          </fieldset>
          <button style={{ fontSize: 14, padding: 5 }} type="submit">Login</button>
        </form>
      </div>
    );
  }

}

export default LoginForm;
