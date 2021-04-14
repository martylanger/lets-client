import React from 'react'
import ballotsToArray from '../../modules/ballotsToArray'
import doTally from '../../modules/doTally'
import mostVotes from '../../modules/mostVotes'

const Borda = props => {
  // DETERMINE THE WINNER USING A BORDA COUNT

  // For each ballot, give options.length-1 points to the top choice,
  //  options.length-2 points to the second choice, and so on.

  // Prepare a results array
  // In the results array, the index # === the option #,
  //  and the value at the index is the option's total points



  let resultsJSX = null

  if (props.election.ballots.length > 0) {
    const tally = mostVotes(doTally(ballotsToArray(props.election.ballots)))
    const results = tally.map(victor => (
      <li key={victor.toString()}>
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

export default Borda
