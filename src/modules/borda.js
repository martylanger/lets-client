import ballotsToArray from './ballotsToArray'
import doTally from './doTally'
import mostVotes from './mostVotes'

const borda = election => {
  // DETERMINE THE WINNER USING A BORDA COUNT

  // For each ballot, give numChoices-1 points to the top choice,
  //  numChoices-2 points to the second choice, and so on
  // Last place is omitted from the loop below because it scores 0 points

  const numChoices = election.choices.length
  const bordaEngine = function (ballots) {
    // Create a new array of the ballots' selections with the strings converted to arrays
    const ballotsArray = ballotsToArray(ballots)

    // Prepare a totalScores array
    // In the totalScores array, the index # === the choice #,
    //  and the value at the index is the choice's total points
    const totalScores = Array(numChoices + 1).fill(0)

    let tally

    // At each rank, tally the votes at that rank (E.g. all the first-place choices)
    // For each vote at a given rank, a choice gets numChoices-rank-1 points
    for (let i = 0; i < numChoices - 1; i++) {
      tally = doTally(ballotsArray, i)
      for (let j = 0; j < tally.length; j++) {
        totalScores[j] += tally[j] * (numChoices - i - 1)
      }
    }
    return mostVotes(totalScores)
  }

  return bordaEngine(election.ballots)
}

export default borda
