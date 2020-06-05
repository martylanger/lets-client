import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const MyElections = props => {
  const [elections, setElections] = useState([])
  useEffect(() => {
    axios({
      url: `${apiUrl}/elections`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => {
        if (elections) {
          setElections(res.data.elections)
        }
      })
      .catch(err => {
        props.msgAlert({
          heading: 'Your elections failed to load',
          message: err.message,
          variant: 'danger'
        })
      })
  }, [1000])
  // Find all elections belonging to the user
  const myElections = elections.filter(election => election.user.email === props.user.email)
  // Create link for each election
  const electionsLinks = myElections.map(election => (
    <li key={election.id}>
      <Link to={`/elections/${election.id}`}>{election.name}</Link>
    </li>
  ))

  return (
    <React.Fragment>
      <h4>Your Elections</h4>
      <ul>
        {electionsLinks}
      </ul>
    </React.Fragment>
  )
}

export default MyElections
