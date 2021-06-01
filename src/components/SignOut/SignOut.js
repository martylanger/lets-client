import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'

import { signOut, signInGuest } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

class SignOut extends Component {
  componentDidMount () {
    const { msgAlert, history, clearUser, setUser, user } = this.props

    signOut(user)
      .finally(() => msgAlert({
        heading: 'Signed Out Successfully',
        messagE: messages.signOutSuccess,
        variant: 'success'
      }))
      .finally(() => history.push('/'))
      .finally(() => clearUser())
      .finally(() => signInGuest()
        .then(res => setUser(res.data.user))
      )
  }

  render () {
    return (
      <Redirect to='/' />
    )
  }
}

export default withRouter(SignOut)
