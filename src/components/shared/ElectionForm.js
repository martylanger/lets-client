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
    <select
      name="voting_method"
      value={election.voting_method}
      onChange={handleChange}
    >
      <option value="">--Please choose an option--</option>
      <option value="instant-runoff">Instant runoff</option>
      <option value="borda-count">Borda count</option>
      <option value="plurality">Plurality</option>
      <option value="approval">Approval</option>
    </select>

    <label>Description</label>
    <input
      placeholder="What should we do?"
      value={election.description}
      name="description"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>

    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ElectionForm
