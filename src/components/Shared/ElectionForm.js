import React from 'react'
import { Link } from 'react-router-dom'

const ElectionForm = ({ election, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      placeholder="A Wonderful Film"
      value={election.name}
      name="title"
      onChange={handleChange}
    />

    <label>Director</label>
    <input
      placeholder="John Doe"
      value={election.voting_method}
      name="director"
      onChange={handleChange}
    />

    <label>Date Released</label>
    <input
      type="date"
      placeholder="YYYY-MM-DD"
      value={election.close_time}
      name="year"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ElectionForm
