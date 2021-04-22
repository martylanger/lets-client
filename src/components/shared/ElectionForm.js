import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Form } from 'react-bootstrap'

const ElectionForm = ({ election, handleSubmit, handleChange, cancelPath }) => (
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
            name="voting-method"
            value={election.voting_method}
            as="select"
            onChange={handleChange}
          >
            <option value="">--Please choose an option--</option>
            <option value="instant-runoff">Instant runoff</option>
            <option value="borda-count">Borda count</option>
            <option value="plurality">Plurality</option>
            <option value="approval" disabled>Approval</option>
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
)

export default ElectionForm

// PRE-BOOTSTRAP FORM
//
// <form onSubmit={handleSubmit}>
//     <Container>
//       <Row>
//         <Col>
//           <label>Name </label>
//           <input
//             placeholder="My Election"
//             value={election.name}
//             name="name"
//             onChange={handleChange}
//           />
//           <p></p>
//           <label>Voting method </label>
//           <select
//             name="voting_method"
//             value={election.voting_method}
//             onChange={handleChange}
//           >
//             <option value="">--Please choose an option--</option>
//             <option value="instant-runoff">Instant runoff</option>
//             <option value="borda-count">Borda count</option>
//             <option value="plurality">Plurality</option>
//             <option value="approval" disabled>Approval</option>
//           </select>
//           <p></p>
//           <label>Description </label>
//           <input
//             placeholder="What should we do?"
//             value={election.description}
//             name="description"
//             onChange={handleChange}
//           />
//         </Col>
//         <Col>
//           <Button variant="primary" type="submit">Submit</Button>
//
//           <Link to={cancelPath}>
//             <Button variant="secondary">Cancel</Button>
//           </Link>
//         </Col>
//       </Row>
//     </Container>
//   </form>
// )
