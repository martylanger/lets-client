import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

const Choices = props => {
  const electionChoices = props.election.choices.map((choice, i) => (
    <ListGroup.Item variant='secondary' key={choice.id}>
      {
        props.deletable &&
        <Button
          variant="danger"
          onClick={props.handleDestroyChoice}
          name={choice.id}
        >
        Delete
        </Button>
      }
      {choice.title}
      <div className="choice-numbers">#{i + 1}</div>
    </ListGroup.Item>
  ))

  return (
    <React.Fragment>
      <ListGroup>
        <ListGroup.Item variant='light'>Choices</ListGroup.Item>
        {electionChoices}
      </ListGroup>
    </React.Fragment>
  )
}

export default Choices
