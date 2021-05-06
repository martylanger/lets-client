import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Choices from '../shared/Choices'
// import Ballots from '../shared/Ballots'
import OwnerOptions from '../shared/OwnerOptions'
import Results from '../shared/Results'
import instantRunoff from '../../modules/instantRunoff'
import plurality from '../../modules/plurality'
import borda from '../../modules/borda'
import { Container, Row, Col, Card, Button, ButtonGroup } from 'react-bootstrap'

const Election = props => {
  const [election, setElection] = useState(null)
  const [deleted, setDeleted] = useState(false)

  useEffect(() => {
    axios({
      url: `${apiUrl}/elections/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setElection(res.data.election))
      .catch(err => {
        props.msgAlert({
          heading: 'Your election failed to load',
          message: err.message,
          variant: 'danger'
        })
      })
  }, [])

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

  // const votingMethodsArray = [
  //   ['instant-runoff', InstantRunoff],
  //   ['plurality', Plurality]
  // ]
  // const votingMethods = new Map(votingMethodsArray)
  // const results = votingMethods.get(election.voting_method)

  let electionJSX

  if (!election) {
    // If it's loading, give a loading gif
    electionJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
  } else if (deleted) {
    electionJSX = <Redirect to={
      { pathname: '/my-elections', state: { msg: 'Election succesfully deleted!' } }
    } />
  } else {
    // Implement the correct voting method for determining the election
    let votingMethod
    switch (election.voting_method) {
    case 'instant-runoff':
      votingMethod = instantRunoff
      break
    case 'plurality':
      votingMethod = plurality
      break
    case 'borda-count':
      votingMethod = borda
    }

    electionJSX = (
      <React.Fragment>
        <div className="logo-small">Let&#39;s</div>
        <Container>
          <Row>
            <ButtonGroup>
              <Link to={`/elections/${props.match.params.id}/ballot-create`}>
                <Button variant="dark">Vote!</Button>
              </Link>
              <OwnerOptions
                user={props.user}
                match={props.match}
                election={election}
                onDestroy={onDestroy}
              />
              <Link to="/my-elections">
                <Button variant="secondary">Back to my elections</Button>
              </Link>
              <Link to="/all-elections">
                <Button variant="secondary">Back to all elections</Button>
              </Link>
            </ButtonGroup>
          </Row>
          <Row>
            <Col>
              <Card className="m-2">
                <Card.Body>
                  <Card.Title>Election: {election.name}</Card.Title>
                  <Card.Subtitle className="text-muted mb-2">Owner: {election.user.email}</Card.Subtitle>
                  <Card.Subtitle className="text-muted mb-2">Voting method: {election.voting_method}</Card.Subtitle>
                  <Card.Text>{election.description}</Card.Text>
                  <Choices election={election} />
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Results election={election} votingMethod={votingMethod}/>
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
