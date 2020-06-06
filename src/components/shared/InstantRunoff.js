import React from 'react'
import ballotsToArray from '../../modules/ballotsToArray'
import doTally from '../../modules/doTally'
import mostVotes from '../../modules/mostVotes'

const InstantRunoff = props => {
  // DETERMINE THE WINNER USING INSTANT RUNOFF

  // Create arrays to track the eliminated options
  let toEliminate = []
  const eliminatedOptions = []

  // Prepare the results array and tally the top choices of all the ballots
  // In the tally array, the index # === the option #, and the value at the index is the number of votes for the option

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
  // const mostVotes = function (tallyArr) {

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

  const instantRunoff = function (ballots) {
    // Create a new array of the ballots' selections with the strings converted to arrays
    const ballotsArray = ballotsToArray(ballots)

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

    // See which option(s) has the most votes and return in victors array
    return mostVotes(tally)
  }

  return (
    <React.Fragment>
      <p>Results: {instantRunoff(props.election.ballots)}</p>
    </React.Fragment>
  )
}

export default InstantRunoff
