import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import BallotForm from '../shared/BallotForm'

const BallotCreate = props => {
  const [ballot, setBallot] = useState({ election_id: props.match.params.id, selections: '' })
  const [election, setElection] = useState(null)
  const [createdBallotId, setCreatedBallotId] = useState(null)

  useEffect(() => {
    axios({
      url: `${apiUrl}/elections/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setElection(res.data.election))
      .catch(err => {
        props.msgAlert({
          heading: 'Your election failed to load',
          message: err.message,
          variant: 'danger'
        })
      })
  }, [])

  const handleChange = event => {
    const updatedField = { [event.target.name]: event.target.value }
    const editedBallot = Object.assign({ ...ballot }, updatedField)
    setBallot(editedBallot)
  }

  const handleSubmit = event => {
    event.preventDefault()
    console.log(ballot)
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

  let ballotJSX

  if (createdBallotId) {
    return <Redirect to={`/elections/${ballot.election_id}`} />
  } else if (!election) {
    // If it's loading, give a loading gif
    ballotJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
  } else {
    const theOptions = election.choices.map((choice, i) =>
      <li key={choice.id}>
        Option #{i + 1}: {choice.title}
      </li>
    )
    ballotJSX = (
      <React.Fragment>
        <BallotForm
          theOptions={theOptions}
          election={election}
          ballot={ballot}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cancelPath="/"
        />
      </React.Fragment>
    )
  }

  // const theBallot = props.election.choices.map(function (choice, i) {
  //
  //   return (
  //     <BallotForm
  //       key={choice.id}
  //       election={props.election}
  //       ballot={ballot}
  //       choice={choice}
  //       index={i + 1}
  //       handleChange={handleChange}
  //       handleSubmit={handleSubmit}
  //       cancelPath="/"
  //     >
  //       <li>
  //         {choice.title}
  //       </li>
  //     </BallotForm>
  // )

  // <BallotForm
  //   election={props.election}
  //   ballot={ballot}
  //   handleChange={handleChange}
  //   handleSubmit={handleSubmit}
  //   cancelPath="/"
  // />

  return (
    ballotJSX
  )
}

export default BallotCreate
