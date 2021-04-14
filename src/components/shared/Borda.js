import React from 'react'
import ballotsToArray from '../../modules/ballotsToArray'
import doTally from '../../modules/doTally'
import mostVotes from '../../modules/mostVotes'

const Borda = props => {
  // DETERMINE THE WINNER USING A BORDA COUNT

  // For each ballot, give numChoices-1 points to the top choice,
  //  numChoices-2 points to the second choice, and so on.

  // Prepare a totalScores array
  // In the totalScores array, the index # === the choice #,
  //  and the value at the index is the choice's total points
  const numChoices = props.election.choices.length
  const borda = function (ballots) {
    // Create a new array of the ballots' selections with the strings converted to arrays
    const ballotsArray = ballotsToArray(ballots)

    const totalScores = Array(numChoices + 1).fill(0)
    // props.election.choices.forEach(choice => {
    //   results[choice] = 0
    // })
    let tally
    for (let i = 0; i < numChoices; i++) {
      tally = doTally(ballotsArray, i)
      for (let j = 0; j < tally.length; j++) {
        totalScores[i] += tally[i] * (numChoices - j)
      }
    }
    return mostVotes(totalScores)
  }

  let resultsJSX = null

  if (props.election.ballots.length > 0) {
    const results = borda(props.election.ballots).map(victor => (
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