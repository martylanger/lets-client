import React from 'react'
import { Link } from 'react-router-dom'

const ElectionForm = ({ election, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Name</label>
    <input
      placeholder="My Election"
      value={election.name}
      name="name"
      onChange={handleChange}
    />

    <label>Voting method</label>
    <input
      placeholder="American"
      value={election.voting_method}
      name="voting_method"
      onChange={handleChange}
    />

    <label>Close time</label>
    <input
      type="datetime"
      placeholder="YYYY-MM-DD"
      value={election.close_time}
      name="close_time"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ElectionForm
