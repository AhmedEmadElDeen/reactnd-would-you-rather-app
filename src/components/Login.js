import React, { Component } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom'

class Login extends Component {

  state = {
    loggedIn: false
  }

  handleLogin(id) {
    const { dispatch } = this.props

    dispatch(setAuthedUser(id))
    this.setState(() => ({
      loggedIn: true
    }))
  }

  render() {

    const { from } = this.props.location || { from: {pathname: '/'} }
    const { loggedIn } = this.state
    const { users } = this.props

    if (loggedIn) {
        return <Redirect to={from}/>
    }

    return (
      <div className='login'>
        <h1 className='app-title'>WOULD YOU RATHER?</h1>
        <img className='logo' src="https://monophy.com/media/Qa5AOOfz6JMqm99Zr8/monophy.gif" alt='logo' />

        <ul className='dropdown'>
          <button className='drop-btn'>Login here to start polling!</button>
          {Object.keys(users).map((user) => (
            <li className='dropdown-content'
              key={users[user].id}
              onClick={() =>
                {this.handleLogin(users[user].id)}}>
              <div className='card-body'>
                <img className='card-avatar' alt={users[user].name} src={users[user].avatarURL} height='80' />
                <p className='card-name'>{users[user].name}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

function mapStateToProps({ users }) {
  return {
    users
  }
}

export default connect(mapStateToProps)(Login)