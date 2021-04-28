import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Card, ListGroup } from 'react-bootstrap'

const Home = props => {
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
    <ListGroup.Item action key={election.id} onClick={() => handleClick(election.id)} >
      {election.name}
    </ListGroup.Item>
  ))

  let homeJSX

  if (electionId) {
    homeJSX = <Redirect to={`/elections/${electionId}`} />
  } else {
    homeJSX = (
      <React.Fragment>
        <Card style={{ width: '18rem' }}>
          <Card.Header>Your Elections</Card.Header>
          <ListGroup>
            {electionsLinks}
          </ListGroup>
        </Card>
      </React.Fragment>
    )
  }

  return (
    homeJSX
  )
}

export default Home
