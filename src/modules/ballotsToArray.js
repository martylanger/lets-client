// Create a new array of the ballots' selections with the strings converted to arrays
const ballotsToArray = function (ballots) {
  return ballots.map(ballot => ballot.selections.split(' '))
}

export default ballotsToArray
