import React from 'react'
import doTally from '../../modules/doTally'
import mostVotes from '../../modules/mostVotes'

const InstantRunoff = props => {
  // DETERMINE THE WINNER USING INSTANT RUNOFF

  // Create arrays to track the eliminated options and victors
  let toEliminate = []
  const eliminatedOptions = []
  // let victors = []
  // Prepare the results array and tally the top choices of all the ballots
  // In the tally array, the index # === the option #, and the value at the index is the number of votes for the option
  // const doTally = function (ballotsArr) {
  //   const results = []
  //   ballotsArr.forEach(ballot => {
  //     // Initiate the count at 0 for every option that received any votes at any rank
  //     ballot.forEach(selection => {
  //       if (!(results[selection] > 0)) {
  //         results[selection] = 0
  //       }
  //     })
  //     // console.log('ballotsArr' + JSON.stringify(ballotsArr))
  //     // console.log('ballot' + JSON.stringify(ballot))
  //     // console.log('ballot[0]' + JSON.stringify(ballot[0]))
  //     // Tally the top choice of each ballot (ballot[0])
  //     results[ballot[0]]++
  //   })
  //   // Discard any votes for nonexistent option #0
  //   results[0] = 0
  //   // console.log('results' + JSON.stringify(results))
  //   return results
  // }

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
  //   tallyArr.reduce(function (high, current, index) {
  //     if (current === high) {
  //       victors.push(index)
  //     }
  //     if (current > high) {
  //       victors = [index]
  //       high = current
  //     }
  //     return high
  //   }, 0)
  // }

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
    const ballotsArray = ballots.map(ballot => ballot.selections.split(' '))

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
