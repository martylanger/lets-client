import React from 'react'

const Choices = props => {
  const electionChoices = props.election.choices.map((choice, i) => (
    <li key={choice.id}>
      Option #{i + 1}: {choice.title} <button onClick={props.handleDestroyChoice} name={choice.id} >Delete</button>

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
