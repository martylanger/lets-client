import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'

import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
import Header from '../Header/Header'
import SignUp from '../SignUp/SignUp'
import SignIn from '../SignIn/SignIn'
import SignOut from '../SignOut/SignOut'
import ChangePassword from '../ChangePassword/ChangePassword'
import Election from '../routes/Election'
import MyElections from '../routes/MyElections'
import AllElections from '../routes/AllElections'
import ElectionCreate from '../routes/ElectionCreate'
import ElectionEdit from '../routes/ElectionEdit'
import ChoiceCreate from '../routes/ChoiceCreate'
import BallotCreate from '../routes/BallotCreate'

class App extends Component {
  constructor () {
    super()

    this.state = {
      user: null,
      msgAlerts: [],
      electionUpdated: false
    }
  }

  setElectionUpdated = electionUpdated => this.setState({ electionUpdated })

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

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
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          <Route path='/all-elections' render={() => (
            <AllElections msgAlert={this.msgAlert} />
          )} />
          <AuthenticatedRoute user={user} path='/my-elections' render={() => (
            <MyElections msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/election-create' render={() => (
            <ElectionCreate msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/elections/:id/choice-create' render={({ match }) => (
            <ChoiceCreate
              match={match}
              msgAlert={this.msgAlert}
              user={user}
              setElectionUpdated={this.setElectionUpdated}
              electionUpdated={this.state.electionUpdated} />
          )} />
          <AuthenticatedRoute user={user} path='/elections/:id/ballot-create' render={({ match }) => (
            <BallotCreate
              match={match}
              msgAlert={this.msgAlert}
              user={user}
              setElectionUpdated={this.setElectionUpdated}
              electionUpdated={this.state.electionUpdated} />
          )} />
          <AuthenticatedRoute user={user} path='/elections/:id/edit' render={({ match }) => (
            <ElectionEdit
              match={match}
              msgAlert={this.msgAlert}
              user={user}
              setElectionUpdated={this.setElectionUpdated}
              electionUpdated={this.state.electionUpdated} />
          )} />
          <AuthenticatedRoute user={user} path='/elections/:id' render={({ match }) => (
            <Election
              match={match}
              msgAlert={this.msgAlert}
              user={user}
              setElectionUpdated={this.setElectionUpdated}
              electionUpdated={this.state.electionUpdated} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
