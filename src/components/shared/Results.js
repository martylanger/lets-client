import React from 'react'
import instantRunoff from '../../modules/instantRunoff'
import plurality from '../../modules/plurality'
import borda from '../../modules/borda'

const Results = props => {
  let results
  if (props.election.ballots.length > 0) {
    switch (props.election.voting_method) {
    case 'instant-runoff':
      results = instantRunoff(props.election).map(victor => (
        <li key={victor.toString()}>
          {props.election.choices[victor - 1].title}
        </li>
      ))
      break
    case 'plurality':
      results = plurality(props.election).map(victor => (
        <li key={victor.toString()}>
          {props.election.choices[victor - 1].title}
        </li>
      ))
      break
    case 'borda-count':
      results = borda(props.election).map(victor => (
        <li key={victor.toString()}>
          {props.election.choices[victor - 1].title}
        </li>
      ))
      break
    }
  }

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

export default Results
