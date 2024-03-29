import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Choices from '../shared/Choices'
import OwnerOptions from '../shared/OwnerOptions'
import Results from '../shared/Results'
import instantRunoff from '../../modules/instantRunoff'
import plurality from '../../modules/plurality'
import { bordaWinners } from '../../modules/borda'
import { Container, Row, Col, Card, Button, ButtonGroup, Spinner } from 'react-bootstrap'

const Election = props => {
  const [election, setElection] = useState(null)
  const [deleted, setDeleted] = useState(false)
  const [updatedElection, setUpdatedElection] = useState(false)

  // Retrieve the election
  useEffect(() => {
    axios({
      url: `${apiUrl}/elections/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .catch(err => {
        props.msgAlert({
          heading: 'Your election failed to load',
          message: err.message,
          variant: 'danger'
        })
      })
      .then(res => {
        setElection(res.data.election)
      })
  }, [updatedElection])

  const onDestroy = () => {
    axios({
      url: `${apiUrl}/elections/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(err => {
        props.msgAlert({
          heading: 'Your election failed to delete',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  // Closing an election sets the close_time as the current time
  const onCloseElection = event => {
    event.preventDefault()
    const now = new Date().toISOString()
    const updatedField = { close_time: now }
    const editedElection = Object.assign({ ...election }, updatedField)

    axios({
      url: `${apiUrl}/elections/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      },
      data: { election: editedElection }
    })
      .catch(err => {
        props.msgAlert({
          heading: 'Failed to update your election',
          message: err.message,
          variant: 'danger'
        })
      })
      .then(() => setUpdatedElection(!updatedElection))
  }

  // const votingMethodsArray = [
  //   ['instant-runoff', InstantRunoff],
  //   ['plurality', Plurality]
  // ]
  // const votingMethods = new Map(votingMethodsArray)
  // const results = votingMethods.get(election.voting_method)

  // I want to

  let electionJSX

  if (!election) {
    // If it's loading, show a spinner
    electionJSX = (
      <React.Fragment>
        <div className="logo-small">Let&#39;s</div>
        <Row>
          <Spinner className="m-auto" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Row>
      </React.Fragment>
    )
  } else if (deleted) {
    // If it's deleted, redirect to dashboard and show msg
    electionJSX = <Redirect to={
      { pathname: '/dashboard', state: { msg: 'Election succesfully deleted!' } }
    } />
  } else {
    // Implement the correct voting method for determining the election
    //    and format the name for display
    let votingMethod
    let votingMethodName

    switch (election.voting_method) {
    case 'instant-runoff':
      votingMethod = instantRunoff
      votingMethodName = 'Instant runoff'
      break
    case 'plurality':
      votingMethod = plurality
      votingMethodName = 'Plurality'
      break
    case 'borda-count':
      votingMethod = bordaWinners
      votingMethodName = 'Borda count'
    }

    // If a close_time has been set, determine whether it is in the past or future
    //  and display it accordingly
    let displayCloseTime = ''
    let electionIsClosed = false
    if (election.close_time) {
      const closeTime = new Date(election.close_time)
      if (closeTime < new Date()) {
        electionIsClosed = true
      }
      if (electionIsClosed) {
        displayCloseTime = `Voting ended at ${closeTime.toLocaleString()}`
      } else {
        displayCloseTime = `Voting will close at ${closeTime.toLocaleString()}`
      }
    }

    electionJSX = (
      <React.Fragment>
        <div className="logo-small">Let&#39;s</div>
        <Container>
          <Row>
            <ButtonGroup>
              {
                !electionIsClosed &&
                <Link to={`/elections/${props.match.params.id}/ballot-create`}>
                  <Button variant="dark">Vote!</Button>
                </Link>
              }
              <OwnerOptions
                user={props.user}
                match={props.match}
                election={election}
                onDestroy={onDestroy}
                onCloseElection={onCloseElection}
                electionIsOpen={!electionIsClosed}
              />
              {
                props.user.id !== 10 &&
                <Link to="/dashboard">
                  <Button variant="secondary">Back to Dashboard</Button>
                </Link>
              }
              <Link to="/all-elections">
                <Button variant="secondary">Back to All Elections</Button>
              </Link>
            </ButtonGroup>
          </Row>
          <Row>
            <Col>
              <Card className="m-2">
                <Card.Body>
                  <Card.Title>Election: {election.name}</Card.Title>
                  <Card.Subtitle className="text-muted mb-2">Owner: {election.user.email}</Card.Subtitle>
                  <Card.Subtitle className="text-muted mb-2">Voting method: {votingMethodName}</Card.Subtitle>
                  <Card.Text>{election.description}</Card.Text>
                  <Choices election={election} />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Results election={election} votingMethod={votingMethod}/>
              <Card className="m-2">
                <Card.Body>
                  <Card.Title className="winners"> {displayCloseTime} </Card.Title>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    )
  }
  return (
    electionJSX
  )
}

export default Election
