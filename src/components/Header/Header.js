import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const authenticatedOptions = (
  <React.Fragment>
    <Nav.Link href="#dashboard">Dashboard</Nav.Link>
    <Nav.Link href="#election-create">New Election</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Nav.Link href="#all-elections">All Elections</Nav.Link>
  </React.Fragment>
)

const Header = ({ user, isRegistered }) => (
  <React.Fragment>
    <Navbar bg="primary" variant="dark" expand="md">
      <Navbar.Brand className="brand" href={ isRegistered ? '#dashboard' : '#sign-in'}>
        Let&#39;s
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          { isRegistered && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
          { alwaysOptions }
          { isRegistered ? authenticatedOptions : unauthenticatedOptions }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  </React.Fragment>
)

export default Header
