import React from 'react'
// import { Link } from 'react-router-dom'

const BallotForm = ({ election, ballot, handleSubmit, handleChange, cancelPath }) => {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        Pick your favorite option:
        <select value={ballot.selections} onChange={handleChange}>
          {election.choices.map(choice => (
            <option key={choice.id} value={`${choice.title}`}>{choice.title}</option>
          ))}
        </select>
      </label>
      <input type="submit" value="Submit" />
    </form>
  )
}

export default BallotForm
