import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

const Election = props => {
  const [election, setElection] = useState(null)
  const [deleted, setDeleted] = useState(false)

  // Call this callback once after the first render, this only occurs once
  // because our dependency array is empty, so our dependencies never change
  // similar to componentDidMount
  useEffect(() => {
    axios({
      url: `${apiUrl}/elections/${props.match.params.id}`,
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${props.user.token}`
      }
    })
      .then(res => setElection(res.data.election))
      .catch(err => {
        props.msgAlert({
          heading: 'Your election failed to load',
          message: err.message,
          variant: 'danger'
        })
      })
  }, [])

  useEffect(() => {
    // This will only run when the compnent will unmount
    // because the dependency array is empty
    return () => {
    }
  }, [])

  useEffect(() => {
    // The cleanup function is called when
    // 1. the component is about to unmount
    // 2. before the 2nd and following renders
    return () => {
    }
  })

  const destroy = () => {
    axios({
      url: `${apiUrl}/elections/${props.match.params.id}`,
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${props.user.token}`
      }
    })
      .then(() => setDeleted(true))
      .catch(err => {
        props.msgAlert({
          heading: 'Your election failed to delete',
          message: err.message,
          variant: 'danger'
        })
      })
  }

  const majorityReached = function (tallyArr, ballotsArr) {
    const winner = tallyArr.findIndex(candidate => candidate > ballotsArr.length / 2)
    if (winner === -1) {
      return false
    } else {
      return winner
    }
  }

  // Tally the top choices of all the ballots
  // In the tally array, the index # === the option #,
  // and the value at the index is the number of votes for the option

  const tally = function (ballotsArr) {
    const results = []
    // Note: ballot[0] is the top choice for that ballot
    ballotsArr.forEach(ballot => {
      if (results[ballot[0]]) {
        // If it's the first vote for an option, assign value 1
        results[ballot[0]] = 1
      } else {
        results[ballot[0]]++
      }
    })
    // Discard any votes for nonexistent option #0
    results[0] = null
    return results
  }

  // Determine the result
  const determineWinner = function (ballots) {
    // Create a new array of the ballots' selections with the strings converted to arrays
    const ballotsArray = election.ballots.map(ballot => ballot.selections.split(' '))

    // election.ballots.forEach(ballot => {
    // Convert ballots from strings to arrays and push them to the ballots array
    // ballotsArray.push(ballot.selections.split(' '))
    // Also make an array of all the choices
    // choicesArray.push(optionNum++)

    // Tally the top choices
    tally(ballotsArray)

    // Does any choice have a majority? If so, return it
    if (majorityReached(tally, ballotsArray)) {
      return majorityReached(tally, ballotsArray)
    }

    const eliminate = function (ballotsArr) {
      ballotsArr.forEach(ballot => {

      })
    }

    // Determine the option with the fewest votes
    // Do any uneliminated choices have 0 votes?
    if (tally.indexOf(undefined)) {
      eliminate(tally.indexOf(undefined))
    }

    // Which choice has the fewest votes?
    tally.reduce(function (min, current, index) {

    })
  }

  let electionJSX

  if (!election) {
    // If it's loading, give a loading gif
    electionJSX = <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"/>
  } else if (deleted) {
    electionJSX = <Redirect to={
      { pathname: '/elections', state: { msg: 'Election succesfully deleted!' } }
    } />
  } else {
    // Options only available to the election owner
    const ownerOpts = props.user.email !== election.user.email ? null : (
      <div>
        {
        // <button onClick={openNoms}>Open Nominations</button>
        // <button onClick={openVote}>Start the vote!</button>
        }
        <Link to={`/elections/${props.match.params.id}/choice-create`}>
          <button>Add an option!</button><p></p>
        </Link>

        <Link to={`/elections/${props.match.params.id}/edit`}>
          <button>Edit</button><p></p>
        </Link>

        <button onClick={destroy}>Delete Election</button><p></p>
      </div>
    )

    const electionChoices = election.choices.map(choice => (
      <li key={choice.id}>
        {choice.title}
      </li>
    ))
    const electionBallots = election.ballots.map(ballot => (
      <li key={ballot.id}>
        {ballot.selections}
      </li>
    ))

    electionJSX = (
      <div>
        <p>Owner: {election.user.email}</p>
        <p>ID: {election.id}</p>
        <h4>Election: {election.name}</h4>
        <p>Voting method: {election.voting_method}</p>
        <p>Choices: {electionChoices}</p>
        <p>Ballots: {electionBallots}</p>
        <p>Results: {determineWinner(election.ballots)}</p>
        <Link to={`/elections/${props.match.params.id}/ballot-create`}>
          <button>Vote!</button><p></p>
        </Link>
        {ownerOpts}
        <Link to="/elections">
          <button>Back to all elections</button>
        </Link>
      </div>
    )
  }
  return (
    electionJSX
  )
}

export default Election
