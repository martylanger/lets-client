import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const OwnerOptions = props => {
  // Options only available to the election owner

  // <button onClick={openNoms}>Open Nominations</button>
  // <button onClick={openVote}>Start the vote!</button>
  // <button onClick={closeVote}>End the vote!</button>

  // Check if the user is the owner of the election
  const ownerOptions = props.user.email !== props.election.user.email ? null : (
    <React.Fragment>
      {
        props.electionIsOpen && <React.Fragment>
          <Link to={`/elections/${props.match.params.id}/choice-create`}>
            <Button variant="light">Add an option</Button>
          </Link>

          <Link to={`/elections/${props.match.params.id}/edit`}>
            <Button variant="light">Edit election</Button>
          </Link>

          <Button onClick={props.onCloseElection}>End voting</Button>
        </React.Fragment>
      }

      <Button variant="danger" className="rounded mx-1" onClick={props.onDestroy}>Delete election</Button>

    </React.Fragment>
  )

  return (
    ownerOptions
  )
}

export default OwnerOptions
