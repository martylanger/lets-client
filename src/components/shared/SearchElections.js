import React from 'react'
import { Form } from 'react-bootstrap'

const SearchElections = ({ handleChange }) => (

  <div className="row">
    <div className="col-sm-10 col-md-8 mx-auto mt-5">
      <Form>
        <Form.Group controlId="searchTerm">
          <Form.Label>Search</Form.Label>
          <Form.Control
            type="text"
            onChange={handleChange}
          />
        </Form.Group>
      </Form>
    </div>
  </div>
)

export default SearchElections
