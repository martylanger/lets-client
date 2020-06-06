import React from 'react'
import ballotsToArray from '../../modules/ballotsToArray'
import doTally from '../../modules/doTally'
import mostVotes from '../../modules/mostVotes'

const Plurality = props => {
  return (
    <React.Fragment>
      <p>Results: {mostVotes(doTally(ballotsToArray(props.election.ballots)))}</p>
    </React.Fragment>
  )
}

export default Plurality
