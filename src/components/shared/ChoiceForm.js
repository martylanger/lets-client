import React from 'react'
import { Link } from 'react-router-dom'

const ChoiceForm = ({ choice, election, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Option</label>
    <input
      value={choice.title}
      name="title"
      onChange={handleChange}
    />

    <label>election id</label>
    <input
      placeholder={choice.election_id}
      value={choice.election_id}
      name="election_id"
      onChange={handleChange}
    />

    <label>Description</label>
    <input
      value={choice.description}
      name="description"
      onChange={handleChange}
    />

    <label>Link</label>
    <input
      value={choice.link}
      name="link"
      onChange={handleChange}
    />

    <button type="submit">Submit</button>
    <Link to={cancelPath}>
      <button>Cancel</button>
    </Link>
  </form>
)

export default ChoiceForm
