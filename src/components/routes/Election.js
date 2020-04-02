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
      method: 'get',
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

  useEffect(() => {
    // This will only run when the compnent will unmount
    // because the dependency array is empty
    return () => {
      console.log('The election is gon disappeare')
    }
  }, [])

  useEffect(() => {
    // The cleanup function is called when
    // 1. the component is about to unmount
    // 2. before the 2nd and following renders
    return () => {
      console.log('Calling cleanup')
    }
  })

  const destroy = () => {
    axios({
      url: `${apiUrl}/elections/${props.match.params.id}`,
      method: 'DELETE'
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

  let movieJSX

  if (!election) {
    movieJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
  } else if (deleted) {
    movieJSX = <Redirect to={
      { pathname: '/Elections', state: { msg: 'Election succesfully deleted!' } }
    } />
  } else {
    movieJSX = (
      <div>
        <h4>{election.name}</h4>
        <p>Voting method: {election.voting_method}</p>
        <p className='choices'></p>
        <button onClick={destroy}>Delete Election</button>
        <Link to={`/elections/${props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to="/elections">Back to all elections</Link>
      </div>
    )
  }
  return (
    movieJSX
  )
}

export default Election
