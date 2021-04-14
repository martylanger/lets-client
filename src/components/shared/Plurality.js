import React from 'react'
import ballotsToArray from '../../modules/ballotsToArray'
import doTally from '../../modules/doTally'
import mostVotes from '../../modules/mostVotes'

const Plurality = props => {
  // DETERMINE THE WINNER USING PLURALITY VOTING

  const plurality = function (ballots) {
    // Create a new array of the ballots' selections with the strings converted to arrays
    const ballotsArray = ballotsToArray(ballots)

    // Tally the top choices
    const tally = doTally(ballotsArray, 0)

    // See which option(s) has the most votes and return in victors array
    return mostVotes(tally)
  }

  let resultsJSX = null

  if (props.election.ballots.length > 0) {
    const results = plurality(props.election.ballots).map(victor => (
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

export default Plurality
