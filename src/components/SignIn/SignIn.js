import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

import { signIn, signInGuest, signOut } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import { Container, Row, Col, Button, Form, Spinner } from 'react-bootstrap'

class SignIn extends Component {
  constructor () {
    super()

    this.state = {
      email: '',
      password: '',
      submitted: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  componentDidMount () {
    const { setUser } = this.props
    signInGuest()
      .then(res => setUser(res.data.user))
  }

  onSignIn = event => {
    event.preventDefault()
    const { msgAlert, history, setUser, user } = this.props
    signOut(user)
    this.setState({ submitted: true })

    signIn(this.state)
      .then(res => setUser(res.data.user))
      .then(() => msgAlert({
        heading: 'Sign In Success',
        message: messages.signInSuccess,
        variant: 'success'
      }))
      .then(() => this.setState({ submitted: false }))
      .then(() => history.push('/dashboard'))
      .catch(error => {
        this.setState({ email: '', password: '', submitted: false })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, submitted } = this.state

    return (
      <React.Fragment>
        <div className="logo-big">Let&#39;s</div>
        <Container className="auth-container">
          <Row>
            <Col className="col-sm-10 col-md-8 mx-auto mt-5">
              <h3>Sign In</h3>
              <Form onSubmit={this.onSignIn}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button variant="primary sign-in-button" type="submit">
                  Submit
                </Button>
                <Link to="sign-up">Not registered yet? Sign up!</Link>
              </Form>
            </Col>
          </Row>
          {
            submitted &&
            <Row>
              <Spinner className="m-auto" animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Row>
          }
        </Container>
      </React.Fragment>
    )
  }
}

export default withRouter(SignIn)
