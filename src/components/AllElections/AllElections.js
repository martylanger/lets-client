import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import { Card, CardDeck, ListGroup } from 'react-bootstrap'

const AllElections = props => {
  const [elections, setElections] = useState([])
  useEffect(() => {
    axios({
      url: `${apiUrl}/elections`,
      method: 'get'
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
      <h4>All Elections</h4>
      <ul>
        {electionsLinks}
      </ul>
    </React.Fragment>
  )
}

export default AllElections
