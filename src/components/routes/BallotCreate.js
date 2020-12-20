import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import BallotForm from '../shared/BallotForm'
import Button from 'react-bootstrap/Button'

const BallotCreate = props => {
  const [ballot, setBallot] = useState({ election_id: props.match.params.id, selections: '' })
  const [election, setElection] = useState(null)
  const [createdBallotId, setCreatedBallotId] = useState(null)
  const [selectionsArray, setSelectionsArray] = useState([])
  const [buttonsArray, setButtonsArray] = useState([])
  const [choicesArray, setChoicesArray] = useState([])
  const [clicked, setClicked] = useState(false)
  const [choice, setChoice] = useState(null)
  const [index, setIndex] = useState(null)

  useEffect(() => {
    console.log('BallotCreate useEffect')
    // If election hasn't been set yet, get it and prepare the ballot
    if (!election) {
      axios({
        url: `${apiUrl}/elections/${props.match.params.id}`,
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${props.user.token}`
        }
      })
        .then(res => {
          setElection(res.data.election)
          setChoicesArray(res.data.election.choices.map(choice => choice))
          setSelectionsArray([])
          setButtonsArray(
            res.data.election.choices.map((choice, i) => (
              <Button
                variant="outline-dark"
                className="choiceBox"
                onClick={() => handleClick(choice, i)}
                key={choice.id}
                name='selections'
                choice={choice}
                index={i + 1}
                value={ballot.selections}
              >
                {choice.title}
              </Button>
            )))
          // console.log(JSON.stringify(buttonsArray[0]))
        })
        .catch(err => {
          props.msgAlert({
            heading: 'Your election failed to load',
            message: err.message,
            variant: 'danger'
          })
        })
    } else if (clicked) {
      // Run when a button is clicked
      // Update ballot.selections
      let updatedSelections
      if (ballot.selections) {
        updatedSelections = ballot.selections + ' ' + index
        // updatedSelections = ballot.selections + ' ' + event.target.index
      } else {
        updatedSelections = (index).toString()
        // updatedSelections = event.target.index
        // console.log('event.target.index: below')
        // console.log(event.target.index)
      }
      const updatedField = { 'selections': updatedSelections }
      const editedBallot = Object.assign({ ...ballot }, updatedField)
      setBallot(editedBallot)

      // Update the selections display
      if (selectionsArray.length > 0) {
        setSelectionsArray([...selectionsArray, ', ', choice.title])
      } else {
        setSelectionsArray([choice.title])
      }

      // Update the remaining choices
      const updatedChoicesArray = choicesArray.map(x => x)
      updatedChoicesArray.splice(choicesArray.indexOf(choice), 1)
      setChoicesArray(updatedChoicesArray)

      // Update the remaining choices buttons
      const updatedButtonsArray = buttonsArray.map(x => x)
      updatedButtonsArray.splice(choicesArray.indexOf(choice), 1)
      setButtonsArray(updatedButtonsArray)

      setClicked(false)
    } else if (createdBallotId) {
      setCreatedBallotId(false)
    } else {
      console.log(ballot)
    }
  }, [clicked, createdBallotId])

  const handleClick = (choice, i) => {
    console.log('handleClicked')
    setChoice(choice)
    setIndex(i + 1)
    setClicked(true)
  }

  // const handleClick = (choice, i) => {
  //   console.log('handleClicked')
  //   console.log('event.target: below')
  //   // console.log(event.target)
  //   // Update ballot.selections locally
  //   let updatedSelections
  //   console.log('ballot.selections? ' + (ballot.selections ? 'true' : 'false'))
  //   if (ballot.selections) {
  //     updatedSelections = ballot.selections + ' ' + (i + 1).toString()
  //     // updatedSelections = ballot.selections + ' ' + event.target.index
  //     console.log('updatedselections1: ' + updatedSelections)
  //   } else {
  //     updatedSelections = (i + 1).toString()
  //     // updatedSelections = event.target.index
  //     console.log('event.target.index: below')
  //     // console.log(event.target.index)
  //     console.log('updatedselections2: ' + updatedSelections)
  //   }
  //   const updatedField = { 'selections': updatedSelections }
  //   console.log('updatedField: below')
  //   console.log(updatedField)
  //   const editedBallot = Object.assign({ ...ballot }, updatedField)
  //   console.log('editedBallot: below')
  //   console.log(editedBallot)
  //   console.log('ballot before setBallot: below')
  //   console.log(ballot)
  //   // setBallot(ballot => editedBallot)
  //   console.log('ballot after setBallot: below')
  //   console.log(ballot)
  //   selectionsArray.push(choice)
  //   // selectionsArray.push(event.target.choice)
  //   // console.log(event.target)
  //   choicesArray.splice(choicesArray.indexOf(choice), 1)
  //   // choicesArray.splice(choicesArray.indexOf(event.target.choice), 1)
  //   buttonsArray.splice(choicesArray.indexOf(choice), 1)
  //   // buttonsArray.splice(choicesArray.indexOf(event.target.choice), 1)
  //   console.log('ballot.selections: ' + ballot.selections)
  //   console.log('editedBallot.selections: ' + editedBallot.selections)
  //   console.log('selectionsArray: ' + JSON.stringify(selectionsArray))
  //   console.log('choicesArray: ' + JSON.stringify(choicesArray))
  //   console.log(ballot)
  // }

  const handleSubmit = event => {
    event.preventDefault()
    console.log('handleSubmitting')
    console.log(ballot)
    axios({
      url: `${apiUrl}/ballots`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      },
      data: { ballot }
    })
      .then(res => setCreatedBallotId(res.data.ballot.id))
      .catch(err => {
        props.msgAlert({
          heading: 'Failed to create your ballot',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  let ballotJSX

  if (createdBallotId) {
    return <Redirect to={`/elections/${ballot.election_id}`} />
    // return <Redirect to={
    //   { pathname: `/elections/${ballot.election_id}`, state: { createdBallot: true } }
    // } />
  } else if (!election) {
    // If it's loading, give a loading gif
    ballotJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
  } else {
    // Display and number the options
    const theOptions = election.choices.map((choice, i) => (
      <li key={choice.id}>
        Option #{i + 1}: {choice.title}
      </li>
    ))

    ballotJSX = (
      <React.Fragment>
        <BallotForm
          theOptions={theOptions}
          election={election}
          ballot={ballot}
          buttonsArray={buttonsArray}
          selectionsArray={selectionsArray}
          handleClick={handleClick}
          handleSubmit={handleSubmit}
          cancelPath={`/elections/${ballot.election_id}`}
        />
      </React.Fragment>
    )
  }
  // selectionsArray appears to have commas in the array, which is a problem.

  // const theBallot = props.election.choices.map(function (choice, i) {
  //
  //   return (
  //     <BallotForm
  //       key={choice.id}
  //       election={props.election}
  //       ballot={ballot}
  //       choice={choice}
  //       index={i + 1}
  //       handleChange={handleChange}
  //       handleSubmit={handleSubmit}
  //       cancelPath="/"
  //     >
  //       <li>
  //         {choice.title}
  //       </li>
  //     </BallotForm>
  // )

  // <BallotForm
  //   election={props.election}
  //   ballot={ballot}
  //   handleChange={handleChange}
  //   handleSubmit={handleSubmit}
  //   cancelPath="/"
  // />

  return (
    ballotJSX
  )
}

export default BallotCreate
