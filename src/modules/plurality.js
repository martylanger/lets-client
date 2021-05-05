import ballotsToArray from './ballotsToArray'
import doTally from './doTally'
import mostVotes from './mostVotes'

const plurality = election => {
  // DETERMINE THE WINNER USING PLURALITY VOTING

  // Create a new array of the ballots' selections with the strings converted to arrays
  const ballotsArray = ballotsToArray(election.ballots)

  // Tally the top choices
  const tally = doTally(ballotsArray, 0)

  // See which option(s) has the most votes and return in victors array
  return mostVotes(tally)
}

export default plurality
