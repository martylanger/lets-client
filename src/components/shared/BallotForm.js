import React from 'react'
import { Link } from 'react-router-dom'

const BallotForm = ({ theOptions, ballot, election, handleSubmit, handleChange, cancelPath }) => {
  return (
    <React.Fragment>
      <ul>
        {theOptions}
      </ul>

      <p> please refer to the options by number and write your selections as a sequence of numbers separated by spaces</p>
      <form onSubmit={handleSubmit}>
        <label>Your ballot</label>
        <input
          value={ballot.selections}
          name="selections"
          onChange={handleChange}
        />

        <button type="submit">Submit</button>

        <Link to={cancelPath}>
          <button>Cancel</button>
        </Link>
      </form>

    </React.Fragment>
  )
}

export default BallotForm

// <form onSubmit={handleSubmit}>
//   <label>
//     Pick your favorite option:
//     <select value={ballot.selections} onChange={handleChange}>
//       {election.choices.map(choice => (
//         <option key={choice.id} value={`${choice.title}`}>{choice.title}</option>
//       ))}
//     </select>
//   </label>
//   <input type="submit" value="Submit" />
// </form>

// <BallotOption
//   key={choice.id}
//   election={election}
//   ballot={ballot}
//   choice={choice}
//   handleChange={handleChange}
//   handleSubmit={handleSubmit}
//   cancelPath="/"
// />
// </ul>
