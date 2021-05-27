import React, { useState } from 'react'
import { Card, ListGroup, Collapse } from 'react-bootstrap'
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { totalScores } from '../../modules/borda'

const BordaScores = props => {
  const [open, setOpen] = useState(false)
  const rawScores = totalScores(props.election)
  rawScores.shift()
  const scoresList = rawScores.map((score, i) => (
    <ListGroup.Item variant='secondary' key={i}>
      {`${props.election.choices[i].title + ': ' + score}`}
    </ListGroup.Item>
  ))
  return (
    <React.Fragment>
      <Card>
        <ListGroup.Item
          action
          onClick={() => setOpen(!open)}
          aria-controls="scores"
          aria-expanded={open}
          variant='light'
        >
        Scores
          <div className="counter">
            { !open && <FontAwesomeIcon icon={faChevronDown} />}
            { open && <FontAwesomeIcon icon={faChevronUp} />}
          </div>
        </ListGroup.Item>
        <Collapse in={open}>
          <ListGroup id='scores'>
            {scoresList}
          </ListGroup>
        </Collapse>
      </Card>
    </React.Fragment>
  )
}

export default BordaScores
