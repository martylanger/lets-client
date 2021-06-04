import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Card, CardDeck, ListGroup, Form, Popover, OverlayTrigger } from 'react-bootstrap'
import LoadingSpinner from '../shared/LoadingSpinner'

const Dashboard = props => {
  const [elections, setElections] = useState([])
  const [electionId, setElectionId] = useState(null)
  const [searchTerm, setSearchTerm] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/elections`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        if (elections) {
          setElections(res.data.elections)
        }
      })
      .catch(err => {
        if (elections) {
          props.msgAlert({
            heading: 'Your elections failed to load',
            message: err.message,
            variant: 'danger'
          })
        }
      })
  }, [1000])

  const handleClick = (electionId) => {
    setElectionId(electionId)
  }

  // SEARCH BAR
  const handleChange = event => {
    setSearchTerm(event.target.value.toLowerCase())
  }
  const matchesSearch = field => {
    return field.toLowerCase().includes(searchTerm)
  }

  // Find all elections belonging to the user
  const myElections = elections.filter(election => election.user.email === props.user.email)

  let filteredElections
  if (!searchTerm) {
    filteredElections = myElections
  } else {
    // Search bar searches election name, description, and choice.titles
    filteredElections = myElections.filter(election => (
      matchesSearch(election.name) ||
      matchesSearch(election.description) ||
      election.choices.find(choice => matchesSearch(choice.title))
    ))
  }

  const popover = (
    <Popover id="search-info">
    Search for an election by:
      <li>name</li>
      <li>description</li>
      <li>candidates</li>
    </Popover>
  )

  // Create link for each election
  const electionsLinks = filteredElections.map(election => (
    <ListGroup.Item action className="dashboard-list" key={election.id} onClick={() => handleClick(election.id)} >
      {election.name}
    </ListGroup.Item>
  ))

  let dashboardJSX

  if (!elections.length) {
    // If it's loading, show a spinner
    dashboardJSX = <LoadingSpinner size='logo-big' />
  } else if (electionId) {
    // Upon user clicking an election, redirect to the election
    dashboardJSX = <Redirect to={`/elections/${electionId}`} />
  } else {
    dashboardJSX = (
      <React.Fragment>
        <div className="logo-big">Let&#39;s</div>
        <CardDeck>
          <Card>
            <Card.Header>Your Groups</Card.Header>
            <Card.Header>Your Profiles</Card.Header>
          </Card>
          <Card>
            <Card.Header>
              <Form inline className="justify-content-between">
                <Form.Label>Your Elections</Form.Label>
                <OverlayTrigger placement="right" overlay={popover}>
                  <Form.Control
                    size="sm"
                    type="text"
                    placeholder="Search"
                    onChange={handleChange} />
                </OverlayTrigger>
              </Form>
            </Card.Header>

            <ListGroup>
              {electionsLinks}
            </ListGroup>
          </Card>
        </CardDeck>
      </React.Fragment>
    )
  }

  return (
    dashboardJSX
  )
}

export default Dashboard
