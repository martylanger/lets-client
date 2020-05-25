import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Elections = props => {
  const [elections, setElections] = useState([])
  useEffect(() => {
    axios({
      url: `${apiUrl}/elections`,
      method: 'get',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setElections(res.data.elections))
      .catch(err => {
        props.msgAlert({
          heading: 'Your elections failed to load',
          message: err.message,
          variant: 'danger'
        })
      })
  }, [])

  const electionsLinks = elections.map(election => (
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

export default Elections
