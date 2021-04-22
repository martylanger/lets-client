import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const ChoiceForm = ({ choice, handleSubmit, handleChange, cancelPath }) => (

  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="title">
          <Form.Label>Option</Form.Label>
          <Form.Control
            required
            type="text"
            name="title"
            value={choice.title}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="description"
            value={choice.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="link">
          <Form.Label>Link</Form.Label>
          <Form.Control
            required
            type="text"
            name="link"
            value={choice.link}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">Submit</Button>
        <Link to={cancelPath}>
          <Button variant="secondary">Cancel</Button>
        </Link>

      </Form>
    </div>
  </div>
)

export default ChoiceForm

// PRE-BOOTSTRAP FORM
// <form onSubmit={handleSubmit}>
// <label>Option</label>
// <input
// value={choice.title}
// name="title"
// onChange={handleChange}
// />
//
// <label>Description</label>
// <input
// value={choice.description}
// name="description"
// onChange={handleChange}
// />
//
// <label>Link</label>
// <input
// value={choice.link}
// name="link"
// onChange={handleChange}
// />
//
// <Button variant="primary" type="submit">Submit</Button>{' '}
// <Link to={cancelPath}>
// <Button variant="secondary">Cancel</Button>
// </Link>
// </form>
// )
