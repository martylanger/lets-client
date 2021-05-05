import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const OwnerOptions = props => {
  // Options only available to the election owner

  // <button onClick={openNoms}>Open Nominations</button>
  // <button onClick={openVote}>Start the vote!</button>
  // <button onClick={closeVote}>End the vote!</button>

  const ownerOptions = props.user.email !== props.election.user.email ? null : (
    <React.Fragment>
      <Link to={`/elections/${props.match.params.id}/choice-create`}>
        <Button variant="light">Add an option!</Button>
      </Link>

      <Link to={`/elections/${props.match.params.id}/edit`}>
        <Button variant="light">Edit</Button>
      </Link>

      <Button variant="danger" className="rounded mx-1" onClick={props.onDestroy}>Delete Election</Button>
    </React.Fragment>
  )

  return (
    ownerOptions
  )
}

export default OwnerOptions
