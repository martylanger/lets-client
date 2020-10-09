import React from 'react'
import ballotsToArray from '../../modules/ballotsToArray'
import doTally from '../../modules/doTally'
import mostVotes from '../../modules/mostVotes'

const Plurality = props => {
  const results = mostVotes(doTally(ballotsToArray(props.election.ballots)))
  const winner = results.length > 1 ? 'Winners' : 'Winner'
  return (
    <React.Fragment>
      <p>{winner}: {results}</p>
    </React.Fragment>
  )
}

export default Plurality
