import React, { useState } from 'react'
import { Card, ListGroup, Collapse } from 'react-bootstrap'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Ballots = props => {
  const [open, setOpen] = useState(false)
  const noBallots = props.election.ballots.length === 0
  const electionBallots = props.election.ballots.map(ballot => (
    <ListGroup.Item action variant='secondary' key={ballot.id}>
      {ballot.selections}
    </ListGroup.Item>
  ))

  return (
    <React.Fragment>
      <Card>
        <ListGroup.Item
          disabled={noBallots}
          action
          onClick={() => setOpen(!open)}
          aria-controls="ballots"
          aria-expanded={open}
          variant='light'
        >
        Ballots
          <div className="counter">
            {`${props.election.ballots.length + ' '}`}
            { open && <FontAwesomeIcon icon={faChevronUp} />}
            { !open && <FontAwesomeIcon icon={faChevronDown} />}
          </div>
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
