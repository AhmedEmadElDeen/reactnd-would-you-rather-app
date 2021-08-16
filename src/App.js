import React, { Component, Fragment } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from './actions/shared'
import Dashboard from './components/Dashboard'
import NewQuestion from './components/NewQuestion'
import Leaderboard from './components/Leaderboard'
import QuestionPage from './components/QuestionPage'
import Login from './components/Login'
import PageNotFound from './components/PageNotFound'
import Nav from './components/Nav'
import LoadingBar from 'react-redux-loading'
import './App.css'

class App extends Component {

  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }

  render() {

    const { loading } = this.props

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <Fragment>
          <LoadingBar />
          <div className='App'>
            {loading === true
              ? <Login />
              : <div>
                  <Nav />
                  <Switch>
                    <Route path='/' exact component={Dashboard} />
                    <Route path='/question/:id' component={QuestionPage} />
                    <Route path='/add' component={NewQuestion} />
                    <Route path='/leaderboard' component={Leaderboard} />
                    <Route path='/login' component={Login} />
                    <Route component={PageNotFound} />
                  </Switch>
                </div>
            }
          </div>
        </Fragment>
      </Router>
    )
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)
