import React from 'react'
import { Row, Spinner } from 'react-bootstrap'

const LoadingSpinner = ({ size }) => (
  <React.Fragment>
    <div className={size}>Let&#39;s</div>
    <Row>
      <Spinner className="m-auto" animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </Row>
  </React.Fragment>
)
export default LoadingSpinner
