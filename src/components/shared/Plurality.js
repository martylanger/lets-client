import React from 'react'
import ballotsToArray from '../../modules/ballotsToArray'
import doTally from '../../modules/doTally'
import mostVotes from '../../modules/mostVotes'

const Plurality = props => {
  const tally = mostVotes(doTally(ballotsToArray(props.election.ballots)))
  const results = tally.map(victor => props.election.choices[victor - 1].title)
  const winner = results.length > 1 ? 'Winners' : 'Winner'
  return (
    <React.Fragment>
      <p>{winner}: {results}</p>
    </React.Fragment>
  )
}

export default Plurality
