import React from 'react'
import { Link } from 'react-router-dom'

const OwnerOptions = props => {
  // Options only available to the election owner
  const ownerOptions = props.grandProps.user.email !== props.election.user.email ? null : (
    <div>
      {
      // <button onClick={openNoms}>Open Nominations</button>
      // <button onClick={openVote}>Start the vote!</button>
      // <button onClick={closeVote}>End the vote!</button>
      }
      <Link to={`/elections/${props.grandProps.match.params.id}/choice-create`}>
        <button>Add an option!</button><p></p>
      </Link>

      <Link to={`/elections/${props.grandProps.match.params.id}/edit`}>
        <button>Edit</button><p></p>
      </Link>

      <button onClick={props.onDestroy}>Delete Election</button><p></p>
    </div>
  )

  return (
    ownerOptions
  )
}

export default OwnerOptions
