import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Choices from '../shared/Choices'
import Ballots from '../shared/Ballots'
import InstantRunoff from '../shared/InstantRunoff'
// import Plurality from '../shared/Plurality'
import OwnerOptions from '../shared/OwnerOptions'

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
  }, [1000])

  useEffect(() => {
    // This will only run when the compnent will unmount
    // because the dependency array is empty
    return () => {
    }
  }, [])

  useEffect(() => {
    // The cleanup function is called when
    // 1. the component is about to unmount
    // 2. before the 2nd and following renders
    return () => {
    }
  })

  const onDestroy = () => {
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

  // const votingMethodsArray = [
  //   ['instant-runoff', InstantRunoff],
  //   ['plurality', Plurality]
  // ]
  // const votingMethods = new Map(votingMethodsArray)
  // const results = votingMethods.get(election.voting_method)
  // let results
  //
  // switch (election.voting_method) {
  //   case 'instant-runoff':
  //     results = (
  //       <InstantRunoff election={election}
  //     )
  //     break
  // }

  let electionJSX

  if (!election) {
    // If it's loading, give a loading gif
    electionJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
  } else if (deleted) {
    electionJSX = <Redirect to={
      { pathname: '/my-elections', state: { msg: 'Election succesfully deleted!' } }
    } />
  } else {
    electionJSX = (
      <div>
        <p>Owner: {election.user.email}</p>
        <h4>Election: {election.name}</h4>
        <p>Voting method: {election.voting_method}</p>
        <Choices election={election} />
        <Ballots election={election} />
        <InstantRunoff election={election} />
        <Link to={`/elections/${props.match.params.id}/ballot-create`}>
          <button>Vote!</button><p></p>
        </Link>
        <OwnerOptions
          user={props.user}
          match={props.match}
          election={election}
          onDestroy={onDestroy}
        />
        <Link to="/my-elections">
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
