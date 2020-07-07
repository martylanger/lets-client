import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const ChoiceForm = ({ choice, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <label>Option</label>
    <input
      value={choice.title}
      name="title"
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

    <Button variant="primary" type="submit">Submit</Button>
    <Link to={cancelPath}>
      <Button variant="secondary">Cancel</Button>
    </Link>
  </form>
)

export default ChoiceForm
