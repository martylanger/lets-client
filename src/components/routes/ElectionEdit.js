import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ElectionForm from '../shared/ElectionForm'
import Choices from '../shared/Choices'

const ElectionEdit = props => {
  // Retrieve election and set state
  const [election, setElection] = useState({ name: '', voting_method: '', description: '', choices: [], ballots: [] })
  const [updatedElection, setUpdatedElection] = useState(false)
  const [deletedChoice, setDeletedChoice] = useState(false)

  useEffect(() => {
    axios(`${apiUrl}/elections/${props.match.params.id}`)
      .then(res => setElection(res.data.election))
      .catch(err => {
        props.msgAlert({
          heading: 'Failed while trying to retrieve your election',
          message: err.message,
          variant: 'danger'
        })
      })
  }, [deletedChoice])

  useEffect(() => {
    // The cleanup function is called when
    // 1. the component is about to unmount
    // 2. before the 2nd and following renders
    return () => {
    }
  })

  // Set state upon updated field
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    // Destructuring the election, making a copy of the object to update it with the modified field
    // console.log([event.target.name])
    // console.log(event.target.value)
    // console.log(updatedField)
    const editedElection = Object.assign({ ...election }, updatedField)
    setElection(editedElection)
  }

  const handleDestroyChoice = event => {
    console.log(event.target.name)

    const choiceId = event.target.name
    console.log(`${apiUrl}/choices/${choiceId}`)
    axios({
      url: `${apiUrl}/choices/${choiceId}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeletedChoice(true))
      .catch(err => {
        props.msgAlert({
          heading: 'Your choice failed to delete',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  // To handle delete choice, I need to:
  // attain the choice id
  // destroy the choice
  // reload the election

  // Send update to the API on submit
  const handleSubmit = event => {
    event.preventDefault()
    axios({
      url: `${apiUrl}/elections/${props.match.params.id}`,
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      },
      data: { election: election }
    })
      .then(() => setUpdatedElection(true))
      .catch(err => {
        props.msgAlert({
          heading: 'Failed to update your election',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  if (updatedElection) {
    props.setElectionUpdated(true)
    return <Redirect to={`/elections/${props.match.params.id}`} />
  } else {
    return (
      <React.Fragment>
        <ElectionForm
          election={election}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath={`/elections/${props.match.params.id}`}
        />
        <Choices
          election={election}
          deletable={true}
          handleDestroyChoice={handleDestroyChoice}
        />
      </React.Fragment>
    )
  }
}

export default ElectionEdit
