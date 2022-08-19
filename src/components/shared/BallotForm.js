import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardDeck, ListGroup, Button, ButtonGroup } from 'react-bootstrap'

const BallotForm = ({ election, handleSubmit, buttonsArray, selectionsDisplay, cancelPath }) => {
  let info
  switch (election.voting_method) {
  case 'instant-runoff':
    info = 'How instant-runoff voting works: First, we tally everyone&apos;s first choice. If no option has a majority, then those who voted for the options with the least 1st-place votes have their vote changed to their second-ranked choice. The votes are then retallied, and the process is repeated until there is a clear winner.'
    break
  case 'plurality':
    info = 'How plurality voting works: Simply, whoever is ranked first choice on the most ballots wins.'
    break
  case 'borda-count':
    info = 'How a Borda count works: Every candidate scores points based on how high they appear on each ballot.'
  }

  return (
    <React.Fragment>
      <div className="logo-small">Let&#39;s</div>

      <p>{info}</p>
      <p>Touch or click the options in the order of your preference, then hit submit.</p>
      <p>If you make a mistake, please hit Cancel and start over.</p>
      <CardDeck>
        <Card>
          <ListGroup>
            {buttonsArray}
          </ListGroup>
        </Card>
        <Card>
          <ListGroup>
            {selectionsDisplay}
          </ListGroup>
        </Card><p></p>
        <ButtonGroup>
          <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}
          <Link to={cancelPath}>
            <Button variant="secondary">Cancel</Button>
          </Link><p></p>
        </ButtonGroup>
      </CardDeck>
    </React.Fragment>
  )
}

export default BallotForm

// IN THE EVENT THAT I DON'T NEED AN ONCLICK,
// I CAN REPLACE SELECTIONSDISPLAY PROP WITH:
//
// selectionsDisplay = selectionsArray.map(selection => (
//   <ListGroup.Item
//     action
//     variant="outline-dark"
//     className="choiceBox"
//     onClick={() => console.log('this is a placeholder')}
//     key={selection}
//     name='selections'
//   >
//     {selection}
//   </ListGroup.Item>
// ))
