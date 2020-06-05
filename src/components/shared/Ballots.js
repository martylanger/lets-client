import React from 'react'

const Ballots = props => {
  const electionBallots = props.election.ballots.map(ballot => (
    <li key={ballot.id}>
      {ballot.selections}
    </li>
  ))

  return (
    <React.Fragment>
      <p>Ballots: {electionBallots}</p>
    </React.Fragment>
  )
}

export default Ballots
