// In the tally array, the index # === the option #,
//  and the value at the index is the number of votes for the option

// Return array of option(s) with the most votes
const mostVotes = function (tallyArr) {
  const victors = []
  tallyArr.reduce(function (high, current, index) {
    if (current === high) {
      victors.push(index)
    }
    if (current > high) {
      victors.splice(0)
      victors.push(index)
      high = current
    }
    return high
  }, 0)
  return victors
}

export default mostVotes
