import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Layout from '../shared/Layout'
const Elections = props => {
  const [elections, setElections] = useState([])
  useEffect(() => {
    axios(`${apiUrl}/elections`)
      .then(res => setElections(res.data.elections))
      .catch(console.error)
  }, [])
  const electionsLinks = elections.map(election => (
    <li key={election.id}>
      <Link to={`/elections/${election.id}`}>{election.name}</Link>
    </li>
  ))
  return (
    <Layout>
      <h4>Elections!?!?!?!</h4>
      <ul>
        {electionsLinks}
      </ul>
    </Layout>
  )
}
export default Elections
