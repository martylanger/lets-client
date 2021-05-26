import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Row, Form, Card, ListGroup, Spinner, Popover, OverlayTrigger } from 'react-bootstrap'

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

  const popover = (
    <Popover id="popover-basic">
      hello
    </Popover>
  )

  // SEARCH BAR
  const handleChange = event => {
    setSearchTerm(event.target.value.toLowerCase())
  }
  const matchesSearch = field => {
    return field.toLowerCase().includes(searchTerm)
  }

  let allElections
  if (!searchTerm) {
    allElections = elections
  } else {
    // Search bar searches election name, user, description, and choice.titles
    allElections = elections.filter(election => (
      matchesSearch(election.name) ||
      matchesSearch(election.user.email) ||
      matchesSearch(election.description) ||
      election.choices.find(choice => matchesSearch(choice.title))
    ))
  }

  // Create a link for each election
  let electionsLinks
  if (allElections.length) {
    electionsLinks = allElections.map(election => (
      <ListGroup.Item
        action
        className='election-list'
        key={election.id}
        onClick={() => setElectionId(election.id)}
      >
        {election.name}
      </ListGroup.Item>
    ))
  } else {
    // If search filters out all elections
    electionsLinks = (
      <ListGroup.Item className='election-list text-muted'>
      No elections match your search
      </ListGroup.Item>
    )
  }

  let allElectionsJSX
  if (!elections.length) {
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
        <Card className='m-auto' style={{ width: '24rem' }}>
          <Card.Header>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
              <Form inline className="justify-content-between">
                <Form.Label>All Elections</Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  placeholder="Search"
                  onChange={handleChange} />
              </Form>
            </OverlayTrigger>
          </Card.Header>
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
