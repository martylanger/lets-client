import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Row, Card, CardDeck, ListGroup, Spinner } from 'react-bootstrap'

const Dashboard = props => {
  const [elections, setElections] = useState([])
  const [electionId, setElectionId] = useState(null)
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

  // Find all elections belonging to the user
  const myElections = elections.filter(election => election.user.email === props.user.email)
  // Create link for each election
  const electionsLinks = myElections.map(election => (
    <ListGroup.Item action className="dashboard-list" key={election.id} onClick={() => handleClick(election.id)} >
      {election.name}
    </ListGroup.Item>
  ))

  let dashboardJSX

  if (!elections) {
    // If it's loading, give a loading gif
    dashboardJSX = (
      <React.Fragment>
        <h1>Let&#39;s</h1>
        <Row>
          <Spinner className="spinner" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
      </React.Fragment>
    )
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
            <Card.Header>Your Elections</Card.Header>
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
