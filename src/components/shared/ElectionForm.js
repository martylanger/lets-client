import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Form } from 'react-bootstrap'

const ElectionForm = ({ election, handleSubmit, handleChange, cancelPath }) => (
  <React.Fragment>
    <div className="logo-small">Let&#39;s</div>
    <div className="row">
      <div className="col-sm-10 col-md-8 mx-auto mt-5">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="email">
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              name="name"
              value={election.name}
              placeholder="Election name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="voting-method">
            <Form.Label>Voting method</Form.Label>
            <Form.Control
              required
              name="voting_method"
              value={election.voting_method}
              as="select"
              onChange={handleChange}
            >
              <option value="">--Please choose an option--</option>
              <option value="instant-runoff">Instant runoff</option>
              <option value="borda-count">Borda count</option>
              <option value="plurality">Plurality</option>
              <option value="approval" disabled>Approval</option>
              <option value="kemeny-young" disabled>Kemeny-Young</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Description (optional)</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={election.description}
              placeholder="What should we do?"
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
  </React.Fragment>
)

export default ElectionForm
