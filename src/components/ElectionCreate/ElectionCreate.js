import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ElectionForm from '../shared/ElectionForm'

const ElectionCreate = props => {
  const [election, setElection] = useState({ name: '', voting_method: '', description: '' })
  const [createdElectionId, setCreatedElectionId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedElection = Object.assign({ ...election }, updatedField)
    setElection(editedElection)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/elections`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      },
      data: { election }
    })
      .then(res => setCreatedElectionId(res.data.election.id))
      .catch(err => {
        props.msgAlert({
          heading: 'Failed to create your election',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  if (createdElectionId) {
    return <Redirect to={`/elections/${createdElectionId}`} />
  }

  return (
    <React.Fragment>
      <ElectionForm
        election={election}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/my-elections"
      />
    </React.Fragment>
  )
}

export default ElectionCreate
