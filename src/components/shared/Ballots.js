import React, { useState } from 'react'
import { Card, ListGroup, Collapse } from 'react-bootstrap'

const Ballots = props => {
  const [open, setOpen] = useState(false)

  const electionBallots = props.election.ballots.map(ballot => (
    <ListGroup.Item action variant='secondary' key={ballot.id}>
      {ballot.selections}
    </ListGroup.Item>
  ))

  return (
    <React.Fragment>
      <Card>
        <ListGroup.Item
          action
          onClick={() => setOpen(!open)}
          aria-controls="ballots"
          aria-expanded={open}
          variant='light'
        >
        Ballots
          <div className="counter">{props.election.ballots.length}</div>
        </ListGroup.Item>
        <Collapse in={open}>
          <ListGroup id='ballots'>
            {electionBallots}
          </ListGroup>
        </Collapse>
      </Card>
    </React.Fragment>
  )
}

export default Ballots
