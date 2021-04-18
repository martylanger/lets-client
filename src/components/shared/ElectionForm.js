import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap'

const ElectionForm = ({ election, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <Container>
      <Row>
        <Col>
          <label>Name </label>
          <input
            placeholder="My Election"
            value={election.name}
            name="name"
            onChange={handleChange}
          />
          <p></p>
          <label>Voting method </label>
          <select
            name="voting_method"
            value={election.voting_method}
            onChange={handleChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="instant-runoff">Instant runoff</option>
            <option value="borda-count">Borda count</option>
            <option value="plurality">Plurality</option>
            <option value="approval" disabled>Approval</option>
          </select>
          <p></p>
          <label>Description </label>
          <input
            placeholder="What should we do?"
            value={election.description}
            name="description"
            onChange={handleChange}
          />
        </Col>
        <Col>
          <Button variant="primary" type="submit">Submit</Button>

          <Link to={cancelPath}>
            <Button variant="secondary">Cancel</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  </form>
)

export default ElectionForm
