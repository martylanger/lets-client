import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import ChoiceForm from '../shared/ChoiceForm'

const ChoiceCreate = props => {
  const [choice, setChoice] = useState({ election_id: '', title: '', description: '', link: '' })
  const [createdChoiceId, setCreatedChoiceId] = useState(null)

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedChoice = Object.assign({ ...choice }, updatedField)
    setChoice(editedChoice)
  }

  const handleSubmit = event => {
    event.preventDefault()

    axios({
      url: `${apiUrl}/choices`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      },
      data: { choice }
    })
      .then(res => setCreatedChoiceId(res.data.choice.id))
      .catch(err => {
        props.msgAlert({
          heading: 'Failed to create your choice',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  if (createdChoiceId) {
    return <Redirect to={`/elections/${choice.election_id}`} />
  }

  return (
    <React.Fragment>
      <ChoiceForm
        election={props.election}
        choice={choice}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath="/"
      />
    </React.Fragment>
  )
}

export default ChoiceCreate
