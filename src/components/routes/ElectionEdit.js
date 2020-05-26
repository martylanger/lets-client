import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import ElectionForm from '../shared/ElectionForm'

const ElectionEdit = props => {
  // Retrieve election and set state
  const [election, setElection] = useState({ name: '', voting_method: '', description: '', choices: [], ballots: [] })
  const [updatedElection, setUpdatedElection] = useState(false)
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
  }, [])

  // Set state upon field update
  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    // Destructuring the election, making a copy of the object to update it with the modified field
    console.log([event.target.name])
    console.log(event.target.value)
    console.log(updatedField)
    const editedElection = Object.assign({ ...election }, updatedField)
    setElection(editedElection)
  }

  // To handle delete choice, I need to:
  // attain the choice id
  // destroy the choice
  // reload the election
  //
  // const handleDelete = event => {
  //   const array = election.choices
  //
  //   setElection()
  // }

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

  // const electionChoices = election.choices.map(choice => (
  //   <li key={choice.id}>
  //     {choice.title}
  //   </li>
  // ))
  // const electionBallots = election.ballots.map(ballot => (
  //   <li key={ballot.id}>
  //     <p>{ballot.title}</p>
  //   </li>
  // ))

  if (updatedElection) {
    return <Redirect to={`/elections/${props.match.params.id}`} />
  } else {
    return (
      // <React.Fragment>
      <ElectionForm
        election={election}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        cancelPath={`/elections/${props.match.params.id}`}
      />
      // <ChoicesAndBallotsList
      //   choices={electionChoices}
      //   // handleDelete={handleDelete}
      // />
    // </React.Fragment>
    )
  }
}

export default ElectionEdit
