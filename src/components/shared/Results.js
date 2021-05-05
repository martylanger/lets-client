import React from 'react'
import instantRunoff from '../../modules/instantRunoff'
import plurality from '../../modules/plurality'
import borda from '../../modules/borda'

const Results = props => {
  let results
  if (props.election.ballots.length > 0) {
    console.log(props.election.voting_method)
    switch (props.election.voting_method) {
    case 'instant-runoff':
      console.log('i')
      results = instantRunoff(props.election).map(victor => (
        <li key={victor.toString()}>
          {props.election.choices[victor - 1].title}
        </li>
      ))
      break
    case 'plurality':
      console.log('p')
      results = plurality(props.election).map(victor => (
        <li key={victor.toString()}>
          {props.election.choices[victor - 1].title}
        </li>
      ))
      break
    case 'borda-count':
      console.log('b')
      results = borda(props.election).map(victor => (
        <li key={victor.toString()}>
          {props.election.choices[victor - 1].title}
        </li>
      ))
      break
    }
  }

  console.log(results)
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
