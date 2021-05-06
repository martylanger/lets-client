import React from 'react'

const Results = props => {
  let results
  if (props.election.ballots.length > 0) {
    results = props.votingMethod(props.election).map(victor => (
      <li key={victor.toString()}>
        {props.election.choices[victor - 1].title}
      </li>
    ))

    let resultsJSX = null

    const winner = results.length > 1 ? 'Winners' : 'Winner'

    resultsJSX = (
      <React.Fragment>
        <p>{winner}:</p>
        {results}
      </React.Fragment>
    )

    return (
      resultsJSX
    )
  }
}

export default Results
