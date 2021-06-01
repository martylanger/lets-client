import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Election from '../Election/Election'
import AllElections from '../AllElections/AllElections'
import ElectionCreate from '../ElectionCreate/ElectionCreate'
import ElectionEdit from '../ElectionEdit/ElectionEdit'
import ChoiceCreate from '../ChoiceCreate/ChoiceCreate'
import BallotCreate from '../BallotCreate/BallotCreate'
import Dashboard from '../Dashboard/Dashboard'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: {
        id: 4
      },
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: { id: 4 } })

  msgAlert = ({ heading, message, variant }) => {
    this.setState({ msgAlerts: [...this.state.msgAlerts, { heading, message, variant }] })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map((msgAlert, index) => (
          <AutoDismissAlert
            key={index}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
          />
        ))}
        <main className="container big-body">
          <Switch>
            <Route exact path='/'>
              <Redirect to='/sign-in' />
            </Route>
            <Route path='/sign-up' render={() => (
              <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
            )} />
            <Route path='/sign-in' render={() => (
              <SignIn msgAlert={this.msgAlert} setUser={this.setUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/sign-out' render={() => (
              <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} setUser={this.setUser} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/change-password' render={() => (
              <ChangePassword msgAlert={this.msgAlert} user={user} />
            )} />

            <Route path='/all-elections' render={() => (
              <AllElections msgAlert={this.msgAlert} />
            )} />
            <AuthenticatedRoute user={user} path='/dashboard' render={() => (
              <Dashboard msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/election-create' render={() => (
              <ElectionCreate msgAlert={this.msgAlert} user={user} />
            )} />
            <AuthenticatedRoute user={user} path='/elections/:id/choice-create' render={({ match }) => (
              <ChoiceCreate
                match={match}
                msgAlert={this.msgAlert}
                user={user}
              />
            )} />
            <AuthenticatedRoute user={user} path='/elections/:id/ballot-create' render={({ match }) => (
              <BallotCreate
                match={match}
                msgAlert={this.msgAlert}
                user={user}
              />
            )} />
            <AuthenticatedRoute user={user} path='/elections/:id/edit' render={({ match }) => (
              <ElectionEdit
                match={match}
                msgAlert={this.msgAlert}
                user={user}
              />
            )} />
            <AuthenticatedRoute user={user} path='/elections/:id' render={({ match }) => (
              <Election
                match={match}
                msgAlert={this.msgAlert}
                user={user}
              />
            )} />
          </Switch>
        </main>
      </Fragment>
    )
  }
}

export default App
