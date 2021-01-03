import React from 'react'
import ballotsToArray from '../../modules/ballotsToArray'
import doTally from '../../modules/doTally'
import mostVotes from '../../modules/mostVotes'

const Plurality = props => {
  let resultsJSX = null

  if (props.election.ballots.length > 0) {
    const tally = mostVotes(doTally(ballotsToArray(props.election.ballots)))
    const results = tally.map(victor => (
      <li key={victor.id}>
        {props.election.choices[victor - 1].title}
      </li>
    ))
    const winner = results.length > 1 ? 'Winners' : 'Winner'
    resultsJSX = (
      <React.Fragment>
        <p>{winner}:</p>
        {results}
      </React.Fragment>
    )
  }

  return (
    resultsJSX
  )
}

export default Plurality
