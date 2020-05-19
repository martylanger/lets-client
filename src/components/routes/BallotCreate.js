import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BallotForm from '../shared/BallotForm'

const BallotCreate = props => {
  const [ballot, setBallot] = useState({ election_id: '', votes: [] })
  const [createdBallotId, setCreatedBallotId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedBallot = Object.assign({ ...ballot }, updatedField)
    setBallot(editedBallot)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/ballots`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      },
      data: { ballot }
    })
      .then(res => setCreatedBallotId(res.data.ballot.id))
      .catch(err => {
        props.msgAlert({
          heading: 'Failed to create your ballot',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  if (createdBallotId) {
    return <Redirect to={`/elections/${ballot.election_id}`} />
  }

  return (
    <React.Fragment>
      <BallotForm
        election={props.election}
        ballot={ballot}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </React.Fragment>
  )
}

export default BallotCreate
