import ballotsToArray from './ballotsToArray'
import doTally from './doTally'
import mostVotes from './mostVotes'

const instantRunoff = election => {
  // DETERMINE THE WINNER USING INSTANT RUNOFF VOTING

  // Create arrays to track the eliminated options
  const toEliminate = []
  const eliminatedOptions = []

  // Prepare the results array and tally the top choices of all the ballots
  // In the tally array, the index # === the option #, and the value at
  //  the index is the number of votes for the option

  // Check to see if any option has reached a majority
  const majorityReached = function (tallyArr, ballotsArr) {
    const activeBallotsArr = ballotsArr.filter(ballot => ballot.length > 0)
    const winner = tallyArr.findIndex(option => option > activeBallotsArr.length / 2)
    if (winner === -1) {
      return false
    } else {
      return winner
    }
  }

  // Push the remaining option(s) with the fewest votes to toEliminate
  // and check that not all options are eliminated

  const fewestVotes = function (tallyArr) {
    tallyArr.reduce(function (low, current, index) {
      if (current > 0) {
        if (current === low) {
          toEliminate.push(index)
        } else if (current < low) {
          toEliminate.splice(0)
          toEliminate.push(index)
          low = current
        }
      }
      return low
    }, 1000000000000000) // Set absurdly high number as initial value of current
    // If all options were pushed to toEliminate, return false to indicate
    //  that there is no option with the fewest votes
    return toEliminate.length + 1 !== tallyArr.length
  }

  // Remove an option from all ballots and push to eliminatedOptions array
  const eliminate = function (ballotsArr, option) {
    ballotsArr.forEach(ballot => {
      if (ballot.includes(option.toString())) {
        ballot.splice(ballot.indexOf(option.toString()), 1)
      }
    })
    eliminatedOptions.push(option)
  }

  // Determine the result:
  //    Tally the top choices (ballotsArray)
  //    Check for a majority winner (tally, ballotsArray)
  //    Determine the uneliminated option(s) with the fewest votes (tally, eliminatedOptions)
  //    Remove that/those option(s) from all ballots (ballotsArray)

  const instantRunoffEngine = function (ballots) {
    // Create a new array of the ballots' selections with the strings converted to arrays
    const ballotsArray = ballotsToArray(ballots)

    // Tally the top choices
    let tally = doTally(ballotsArray, 0)
    let remainingOptions = [0, 0, 0]

    // Does any option have a majority?
    while (!majorityReached(tally, ballotsArray) && remainingOptions.length > 2) {
      // console.log('ballotsArray: ')
      // console.log(JSON.stringify(ballotsArray))
      // console.log('tally: ')
      // console.log(JSON.stringify(tally))
      // console.log('majorityReached: ')
      // console.log(majorityReached(tally, ballotsArray))
      // console.log('eliminatedOptions: ')
      // console.log(JSON.stringify(eliminatedOptions))

      // If not, determine the option with the fewest votes
      //  If any uneliminated options have 0 votes, eliminate them
      let votelessCandidate = false
      for (let i = 1; i < tally.length; i++) {
        if (!tally[i] && !eliminatedOptions.includes(i)) {
          eliminate(ballotsArray, i)
          votelessCandidate = true
        }
      }
      //  Otherwise, find the option with the fewest votes and eliminate it
      if (!votelessCandidate) {
        if (!fewestVotes(tally)) {
          // If there's a tie among all options, fewestVotes() returns false
          return mostVotes(tally)
        } else {
          // In case there's a tie for fewestVotes, select one at random and eliminate it
          const randomLoser = toEliminate[Math.floor(Math.random() * toEliminate.length)]
          eliminate(ballotsArray, randomLoser)
          toEliminate.splice(0)
        }
      }
      // Retally the votes
      tally = doTally(ballotsArray, 0)
      // Count the remaining options
      remainingOptions = tally.filter(option => option > 0)
      // console.log('end of loop status')
      // console.log('ballotsArray: ')
      // console.log(ballotsArray)
      // console.log('tally: ')
      // console.log(JSON.stringify(tally))
      // console.log('remainingOptions: ' + remainingOptions)
      // console.log('remainingOptions.length: ' + remainingOptions.length)
      // console.log('majorityReached: ' + majorityReached(tally, ballotsArray))
      // console.log('end of loop')
    }

    // See which option(s) has the most votes and return in victors array
    return mostVotes(tally)
  }

  return instantRunoffEngine(election.ballots)
}

export default instantRunoff
