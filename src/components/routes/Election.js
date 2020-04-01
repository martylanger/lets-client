import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'

import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'

const Election = props => {
  const [election, setElection] = useState(null)
  const [deleted, setDeleted] = useState(false)

  // Call this callback once after the first render, this only occurs once
  // because our dependency array is empty, so our dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios(`${apiUrl}/elections/${props.match.params.id}`)
      // Make sure to update this.setState to our hooks setMovie function
      .then(res => setElection(res.data.election))
      .catch(console.error)
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
      .catch(console.error)
  }

  if (!election) {
    return <p>Loading...</p>
  }

  if (deleted) {
    return <Redirect to={
      { pathname: '/', state: { msg: 'Election succesfully deleted!' } }
    } />
  }

  return (
    <Layout>
      <h4>{election.name}</h4>
      <p>Voting method: {election.voting_method}</p>
      <p className='choices'></p>
      <button onClick={destroy}>Delete Election</button>
      <Link to={`/elections/${props.match.params.id}/edit`}>
        <button>Edit</button>
      </Link>
      <Link to="/elections">Back to all elections</Link>
    </Layout>
  )
}

export default Election
