import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Row, Card, ListGroup, Spinner } from 'react-bootstrap'
import SearchElections from '../shared/SearchElections'

const AllElections = props => {
  const [elections, setElections] = useState([])
  const [electionId, setElectionId] = useState(null)
  const [searchTerm, setSearchTerm] = useState(null)

  // Get the elections
  useEffect(() => {
    axios({
      url: `${apiUrl}/elections`,
      method: 'get'
    })
      .then(res => setElections(res.data.elections))
      .catch(err => {
        props.msgAlert({
          heading: 'Your elections failed to load',
          message: err.message,
          variant: 'danger'
        })
      })
  }, [])

  // const handleClick = (electionId) => {
  //   setElectionId(electionId)
  // }
  const handleChange = event => {
    setSearchTerm(event.target.value)
  }

  // Create a link for each election
  let allElections = elections
  if (!searchTerm) {
    allElections = elections
  } else {
    allElections = elections.filter(election => (
      election.name.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  }

  const electionsLinks = allElections.map(election => (
    <ListGroup.Item action className='election-list' key={election.id} onClick={() => setElectionId(election.id)} >
      {election.name}
    </ListGroup.Item>
  ))
  let allElectionsJSX

  if (!elections) {
    // If it's loading, show a spinner
    allElectionsJSX = (
      <React.Fragment>
        <div className="logo-big">Let&#39;s</div>
        <Row>
          <Spinner className="m-auto" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
      </React.Fragment>
    )
  } else if (electionId) {
    // Upon user clicking an election, redirect to the election
    allElectionsJSX = <Redirect to={`/elections/${electionId}`} />
  } else {
    allElectionsJSX = (
      <React.Fragment>
        <div className="logo-big">Let&#39;s</div>
        <SearchElections
          handleChange={handleChange}
        />
        <Card className='m-auto' style={{ width: '24rem' }}>
          <Card.Header>All Elections</Card.Header>
          <ListGroup>
            {electionsLinks}
          </ListGroup>
        </Card>
      </React.Fragment>
    )
  }

  return (
    allElectionsJSX
  )
}

export default AllElections
