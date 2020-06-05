import React, { useEffect, useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Choices from '../shared/Choices'
import Ballots from '../shared/Ballots'

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
  }, [election])

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
  // Display and number the options
  // const theOptions = election.choices.map((choice, i) => (
  //   <li key={choice.id}>
  //     Option #{i + 1}: {choice.title}
  //   </li>
  // ))

  // DETERMINE THE WINNER USING INSTANT RUNOFF

  // Create arrays to track the eliminated options and victors
  let toEliminate = []
  const eliminatedOptions = []
  let victors = []
  // Prepare the results array and tally the top choices of all the ballots
  // In the tally array, the index # === the option #, and the value at the index is the number of votes for the option
  const doTally = function (ballotsArr) {
    const results = []
    ballotsArr.forEach(ballot => {
      // Initiate the count at 0 for every option that received any votes at any rank
      ballot.forEach(selection => {
        if (!(results[selection] > 0)) {
          results[selection] = 0
        }
      })
      // console.log('ballotsArr' + JSON.stringify(ballotsArr))
      // console.log('ballot' + JSON.stringify(ballot))
      // console.log('ballot[0]' + JSON.stringify(ballot[0]))
      // Tally the top choice of each ballot (ballot[0])
      results[ballot[0]]++
    })
    // Discard any votes for nonexistent option #0
    results[0] = 0
    // console.log('results' + JSON.stringify(results))
    return results
  }

  // Check to see if any option has reached a majority
  const majorityReached = function (tallyArr, ballotsArr) {
    const winner = tallyArr.findIndex(candidate => candidate > ballotsArr.length / 2)
    if (winner === -1) {
      return false
    } else {
      return winner
    }
  }

  // Push the remaining option(s) with the fewest votes to toEliminate
  const fewestVotes = function (tallyArr) {
    tallyArr.reduce(function (low, current, index) {
      if (current > 0) {
        if (current === low) {
          toEliminate.push(index)
        } else if (current < low) {
          toEliminate = [index]
          low = current
        }
      }
      return low
    }, 1000000000000000)
  }

  // Push the option(s) with the most votes to victors
  const mostVotes = function (tallyArr) {
    tallyArr.reduce(function (high, current, index) {
      if (current === high) {
        victors.push(index)
      }
      if (current > high) {
        victors = [index]
        high = current
      }
      return high
    }, 0)
  }

  // Remove an option from all ballots
  const eliminate = function (ballotsArr, option) {
    ballotsArr.forEach(ballot => {
      ballot.splice(ballot.indexOf(option.toString()), 1)
    })
  }

  // Determine the result:
  //    Tally the top votes (ballotsArray)
  //    Check for a majority winner (tally, ballotsArray)
  //    Determine the uneliminated option(s) with the fewest votes (tally, eliminatedOptions)
  //    Remove that/those option(s) from all ballots (ballotsArray)

  const determineWinners = function (ballots) {
    // Create a new array of the ballots' selections with the strings converted to arrays
    const ballotsArray = election.ballots.map(ballot => ballot.selections.split(' '))

    // Tally the top choices
    let tally = doTally(ballotsArray)
    let remainingOptions = 3

    // Does any option have a majority?
    while (!majorityReached(tally, ballotsArray) && remainingOptions > 2) {
      // If not, determine the option with the fewest votes
      //  If any uneliminated options have 0 votes, eliminate them
      for (let i = 1; i < tally.length; i++) {
        if (!tally[i] && !eliminatedOptions.includes(i)) {
          toEliminate.push(i)
          eliminate(ballotsArray, i)
          eliminatedOptions.push(i)
        }
      }
      // Otherwise, find the option(s) with the fewest votes and eliminate them
      if (toEliminate.length === 0) {
        fewestVotes(tally)
        toEliminate.forEach(option => {
          eliminate(ballotsArray, option)
          eliminatedOptions.push(option)
        })
        toEliminate = []
      }
      // Retally the votes
      tally = doTally(ballotsArray)
      // Count the remaining options
      remainingOptions = tally.filter(option => option > 0)
    }

    // See which option(s) has the most votes and push to victors array
    mostVotes(tally)
    return victors
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
        // <button onClick={closeVote}>End the vote!</button>
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

    electionJSX = (
      <div>
        <p>Owner: {election.user.email}</p>
        <p>ID: {election.id}</p>
        <h4>Election: {election.name}</h4>
        <p>Voting method: {election.voting_method}</p>
        <Choices election={election} />
        <Ballots election={election} />
        <p>Results: {determineWinners(election.ballots)}</p>
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
