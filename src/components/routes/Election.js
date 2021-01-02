import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Choices from '../shared/Choices'
import Ballots from '../shared/Ballots'
import InstantRunoff from '../shared/InstantRunoff'
import Plurality from '../shared/Plurality'
import OwnerOptions from '../shared/OwnerOptions'

import { Container, Row, Col } from 'react-bootstrap'

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
    props.setElectionUpdated(false)
  }, [props.electionUpdated])

  useEffect(() => {
    // This will only run when the compnent will unmount
    // because the dependency array is empty
    return () => {
    }
  }, [])

  useEffect(() => {
    // The cleanup function is called when
    // 1. the component is about to unmount
    // 2. before the 2nd and following renders
    return () => {
    }
  })

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
    let results

    switch (election.voting_method) {
    case 'instant-runoff':
      results = (
        <InstantRunoff election={election} />
      )
      break
    case 'plurality':
      results = (
        <Plurality election={election} />
      )
    }

    electionJSX = (
      <Container>
        <Row>
          <Col>
            <p></p>
            <h4>Election: {election.name}</h4>
            <h5>{election.description}</h5>
            <p>Owner: {election.user.email}</p>
            <p>Voting method: {election.voting_method}</p>
            <Choices election={election} />
            <Ballots election={election} />
          </Col>
          <Col>
            <p></p>
            <Link to={`/elections/${props.match.params.id}/ballot-create`}>
              <Button variant="primary">Vote!</Button>
            </Link>
            <p></p>
            <OwnerOptions
              user={props.user}
              match={props.match}
              election={election}
              onDestroy={onDestroy}
            />
            <Link to="/my-elections">
              <Button variant="primary">Back to my elections</Button>
            </Link>
            <Link to="/all-elections">
              <Button variant="primary">Back to all elections</Button>
            </Link>
            <p></p>
            <p></p>
            {results}
          </Col>
        </Row>
      </Container>
    )
  }
  return (
    electionJSX
  )
}

export default Election
