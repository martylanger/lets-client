import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const OwnerOptions = props => {
  // Options only available to the election owner
  const ownerOptions = props.user.email !== props.election.user.email ? null : (
    <div>
      {
      // <button onClick={openNoms}>Open Nominations</button>
      // <button onClick={openVote}>Start the vote!</button>
      // <button onClick={closeVote}>End the vote!</button>
      }
      <Link to={`/elections/${props.match.params.id}/choice-create`}>
        <Button variant="secondary">Add an option!</Button><p></p>
      </Link>

      <Link to={`/elections/${props.match.params.id}/edit`}>
        <Button variant="secondary">Edit</Button><p></p>
      </Link>

      <Button variant="danger" onClick={props.onDestroy}>Delete Election</Button><p></p>
    </div>
  )

  return (
    ownerOptions
  )
}

export default OwnerOptions
