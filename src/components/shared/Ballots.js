import React from 'react'
import { ListGroup } from 'react-bootstrap'

const Ballots = props => {
  const electionBallots = props.election.ballots.map(ballot => (
    <ListGroup.Item action variant='secondary' key={ballot.id}>
      {ballot.selections}
    </ListGroup.Item>
  ))

  return (
    <React.Fragment>
      <ListGroup>
        <ListGroup.Item variant='light'>Ballots: </ListGroup.Item>
        {electionBallots}
      </ListGroup>
    </React.Fragment>
  )
}

export default Ballots
