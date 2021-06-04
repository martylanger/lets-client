import React from 'react'
import { Link } from 'react-router-dom'
import { Row, ListGroup, Button, Card, CardDeck } from 'react-bootstrap'

const BallotForm = props => {
  // const [selectionsArray, setSelectionsArray] = useState([])
  // const [buttonsArray, setButtonsArray] = useState([])
  // const [choicesArray, setChoicesArray] = useState([])

  // const optionNames = i => 'option-' + i
  // const optionValues = i => 'voting-method-' + i

  // For the ballot form I need to:
  // Have an array of all the choices in state
  // Have an array of all the selection menus
  // Selection menus should deactivate already selected options with attribute disabled

  // choice divs
  // setSelectionsArray([])
  // setChoicesArray(election.choices.map(choice => choice.title))
  // setButtonsArray([])

  // const selectionsArray = []
  // const choicesArray = election.choices.map(choice => choice)
  // console.log(JSON.stringify(choicesArray))
  // const buttonsArray = []
  // const onClick = choice => {
  //   console.log('onClicked')
  //   selectionsArray.push(choice.title)
  //   choicesArray.splice(choicesArray.indexOf(choice), 1)
  //   buttonsArray.splice(choicesArray.indexOf(choice), 1)
  //   console.log(ballot.selections)
  // }

  // buttonsArray = election.choices.map((choice, i) => (
  //   <button
  //     className="choiceBox"
  //     onClick={handleClick}
  //     key={choice.id}
  //     name='selections'
  //     choice={choice}
  //     value={i + 1}
  //   >
  //     {choice.title}
  //   </button>
  // ))
  // console.log(JSON.stringify(buttonsArray))
  // List the choices for user reference

  let info
  switch (props.election.voting_method) {
  case 'instant-runoff':
    info = 'How instant-runoff voting works: First, we tally everyone&apos;s first choice. If no option has a majority, then those who voted for the options with the least 1st-place votes have their vote changed to their second-ranked choice. The votes are then retallied, and the process is repeated until there is a clear winner.'
    break
  case 'plurality':
    info = 'How plurality voting works: Simply, whoever is ranked first choice on the most ballots wins.'
    break
  case 'borda-count':
    info = 'How a Borda count works: Every candidate scores points based on how high they appear on each ballot.'
  }

  const selectionsArray = props.selectionsArray.map((selection, i) => (
    <ListGroup.Item
      variant="outline-dark"
      className="choiceBox"
      key={i}
    >
      {selection}
    </ListGroup.Item>
  ))

  return (
    <React.Fragment>
      <div className="logo-small">Let&#39;s</div>

      <p>{info}</p>
      <p>Touch or click the options in the order of your preference, then hit submit.</p>
      <p>If you make a mistake, please hit Cancel and start over.</p>
      <Row>
        <CardDeck>
          <Card>
            <Card.Header>
              Not yet ranked
            </Card.Header>
            <ListGroup>
              {props.buttonsArray}
            </ListGroup>
          </Card>
          <Card>
            <Card.Header>
              Rankings
            </Card.Header>
            {selectionsArray}
          </Card>
        </CardDeck>
      </Row>
      <Button variant="primary" onClick={props.handleSubmit}>Submit</Button>{' '}
      <Link to={props.cancelPath}>
        <Button variant="secondary">Cancel</Button>
      </Link><p></p>
    </React.Fragment>
  )
}

export default BallotForm

// {selectionsArray.map(selection =>
//   <p key={selection.toString()}>{selection}</p>
// )}
