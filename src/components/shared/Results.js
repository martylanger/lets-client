import React from 'react'
import { Card } from 'react-bootstrap'
import Ballots from '../shared/Ballots'
import BordaScores from '../shared/BordaScores'

const Results = props => {
  let results
  let resultsJSX = null

  if (props.election.ballots.length > 0) {
    results = props.votingMethod(props.election).map(victor => (
      <h1 className="winners" key={victor.toString()}>
        {props.election.choices[victor - 1].title}
      </h1>
    ))

    const winner = results.length > 1 ? 'Winners:' : 'Winner:'

    resultsJSX = (
      <Card className="m-2">
        <Card.Body>
          <Card.Title>{winner}</Card.Title>
          {results}
          {
            props.election.voting_method === 'borda-count' &&
            <BordaScores election={props.election} />
          }
          <Ballots election={props.election} />
        </Card.Body>
      </Card>
    )
  }
  return (
    resultsJSX
  )
}

export default Results
