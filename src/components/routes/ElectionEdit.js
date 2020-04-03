import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ElectionForm from '../shared/ElectionForm'

const ElectionEdit = props => {
  const [election, setElection] = useState({ title: '', director: '', year: '' })
  const [updatedElection, setUpdatedElection] = useState(false)
  useEffect(() => {
    axios(`${apiUrl}/elections/${props.match.params.id}`)
      .then(res => setElection(res.data.election))
      .catch(console.error)
  }, [])
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedElection = Object.assign({ ...election }, updatedField)
    // React doesn't like mutating objects / storing its data without using this.setState
    // destructuring the election, making a copy of the object to update it with the modified field
    setElection(editedElection)
  }
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
    return <Redirect to={`/elections/${props.match.params.id}`} />
  }
  return (
    <React.Fragment>
      <ElectionForm
        election={election}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/elections/${props.match.params.id}`}
      />
    </React.Fragment>
  )
}
export default ElectionEdit
