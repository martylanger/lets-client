import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Election = props => {
  const [election, setElection] = useState(null)
  const [deleted, setDeleted] = useState(false)

  // Call this callback once after the first render, this only occurs once
  // because our dependency array is empty, so our dependencies never change
  // similar to componentDidMount
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

  // useEffect(() => {
  //   // This will only run when the compnent will unmount
  //   // because the dependency array is empty
  //   return () => {
  //     console.log('The election is gon disappeare')
  //   }
  // }, [])

  // useEffect(() => {
  //   // The cleanup function is called when
  //   // 1. the component is about to unmount
  //   // 2. before the 2nd and following renders
  //   return () => {
  //     console.log('Calling cleanup')
  //   }
  // })

  const destroy = () => {
    axios({
      url: `${apiUrl}/elections/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(err => {
        props.msgAlert({
          heading: 'Your election failed to delete',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  let electionJSX

  if (!election) {
    electionJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
  } else if (deleted) {
    electionJSX = <Redirect to={
      { pathname: '/elections', state: { msg: 'Election succesfully deleted!' } }
    } />
  } else {
    const ownerOpts = props.user.email !== election.user.email ? null : (
      <div>
        {
        // <button onClick={openNoms}>Open Nominations</button>
        // <button onClick={openVote}>Start the vote!</button>
        }
        <Link to={'/choice-create'}>
          <button>Add an option!</button>
        </Link>

        <button onClick={destroy}>Delete Election</button>
        <Link to={`/elections/${props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
      </div>
    )
    const electionChoices = election.choices.map(choice => (
      <li key={choice.id}>
        {choice.title}
      </li>
    ))
    const electionBallots = election.ballots.map(ballot => (
      <li key={ballot.id}>
        <p>{ballot.title}</p>
      </li>
    ))
    electionJSX = (
      <div>
        <p>Owner: {election.user.email}</p>
        <p>ID: {election.id}</p>
        <h4>Election: {election.name}</h4>
        <p>Voting method: {election.voting_method}</p>
        <p>Choices: {electionChoices}</p>
        <p>Ballots: {electionBallots}</p>
        {ownerOpts}
        <Link to="/elections">
          <button>Back to all elections</button>
        </Link>
      </div>
    )
  }
  return (
    electionJSX
  )
}

export default Election
