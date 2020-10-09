import React from 'react'
import Button from 'react-bootstrap/Button'

const Choices = props => {
  const electionChoices = props.election.choices.map((choice, i) => (
    <li key={choice.id}>
      {props.deletable && <Button variant="danger" onClick={props.handleDestroyChoice} name={choice.id}>Delete</Button>
      }
      Option #{i + 1}: {choice.title}
    </li>
  ))

  // Alternatives for using an ordered list to render the option numbers:
  // {choice.title}
  // <ol>Choices: {electionChoices}</ol>

  return (
    <React.Fragment>
      <p>Choices: {electionChoices}</p>
    </React.Fragment>
  )
}

export default Choices
