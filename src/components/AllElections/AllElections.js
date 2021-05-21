import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Row, Form, Card, ListGroup, Spinner } from 'react-bootstrap'

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

  // SEARCH BAR
  const handleChange = event => {
    setSearchTerm(event.target.value.toLowerCase())
  }

  let allElections
  if (!searchTerm) {
    allElections = elections
  } else {
    allElections = elections.filter(election => (
      election.name.toLowerCase().includes(searchTerm) ||
      election.user.email.toLowerCase().includes(searchTerm) ||
      election.choices.find(choice => choice.title.includes(searchTerm))
    ))
  }

  // Create a link for each election
  let electionsLinks
  if (allElections.length) {
    electionsLinks = allElections.map(election => (
      <ListGroup.Item action className='election-list' key={election.id} onClick={() => setElectionId(election.id)} >
        {election.name}
      </ListGroup.Item>
    ))
  } else {
    electionsLinks = (
      <ListGroup.Item className='election-list text-muted'>
      No elections match your search
      </ListGroup.Item>
    )
  }

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
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <Form>
              <Form.Group controlId="searchTerm">
                <Form.Label>Search</Form.Label>
                <Form.Control
                  type="text"
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </div>
        </div>
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
