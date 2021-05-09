import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
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

  onSignIn = event => {
    event.preventDefault()
    this.setState({ submitted: true })
    const { msgAlert, history, setUser } = this.props

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
        <Container className="sign-in-container">
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
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Col>
          </Row>
          <Row>
            {
              submitted &&
              <Spinner className="m-auto" animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            }
          </Row>
        </Container>
      </React.Fragment>
    )
  }
}

export default withRouter(SignIn)
