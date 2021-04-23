import React from 'react'
import { Button, ListGroup } from 'react-bootstrap'

const Choices = props => {
  const electionChoices = props.election.choices.map((choice, i) => (
    <ListGroup.Item action variant='secondary' key={choice.id}>
      {props.deletable && <Button variant="danger" onClick={props.handleDestroyChoice} name={choice.id}>Delete</Button>
      }
      Option #{i + 1}: {choice.title}
    </ListGroup.Item>
  ))

  return (
    <React.Fragment>
      <ListGroup>
        <ListGroup.Item variant='light'>Choices: </ListGroup.Item>
        {electionChoices}
      </ListGroup>
    </React.Fragment>
  )
}

export default Choices
