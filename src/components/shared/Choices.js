import React from 'react'

const Choices = props => {
  const electionChoices = props.election.choices.map(choice => (
    <li key={choice.id}>
      {choice.title}
    </li>
  ))

  return (
    <React.Fragment>
      <p>Choices: {electionChoices}</p>
    </React.Fragment>
  )
}

export default Choices
