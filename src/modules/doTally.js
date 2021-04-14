// In the results array, the index # === the option #,
//  and the value at the index is the number of votes for the option

// doTally takes an array of ballots (as arrays) and returns an array: results

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
  // Ensure nonexistent option #0 has 0 votes
  results[0] = 0
  // console.log('results' + JSON.stringify(results))
  return results
}

export default doTally
