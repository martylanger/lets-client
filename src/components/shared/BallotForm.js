import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'

const BallotForm = ({ theOptions, ballot, election, handleSubmit, handleClick, buttonsArray, selectionsArray, cancelPath }) => {
  // const [selectionsArray, setSelectionsArray] = useState([])
  // const [buttonsArray, setButtonsArray] = useState([])
  // const [choicesArray, setChoicesArray] = useState([])

  // const optionNames = i => 'option-' + i
  // const optionValues = i => 'voting-method-' + i

  // For the ballot form I need to:
  // Have an array of all the choices in state
  // Have an array of all the selection menus
  // Selection menus should deactivate already selected options with attribute disabled

  // choice divs
  // setSelectionsArray([])
  // setChoicesArray(election.choices.map(choice => choice.title))
  // setButtonsArray([])

  // const selectionsArray = []
  // const choicesArray = election.choices.map(choice => choice)
  // console.log(JSON.stringify(choicesArray))
  // const buttonsArray = []
  // const onClick = choice => {
  //   console.log('onClicked')
  //   selectionsArray.push(choice.title)
  //   choicesArray.splice(choicesArray.indexOf(choice), 1)
  //   buttonsArray.splice(choicesArray.indexOf(choice), 1)
  //   console.log(ballot.selections)
  // }

  // buttonsArray = election.choices.map((choice, i) => (
  //   <button
  //     className="choiceBox"
  //     onClick={handleClick}
  //     key={choice.id}
  //     name='selections'
  //     choice={choice}
  //     value={i + 1}
  //   >
  //     {choice.title}
  //   </button>
  // ))
  // console.log(JSON.stringify(buttonsArray))
  // List the choices for user reference
  return (
    <React.Fragment>
      <p>How instant-runoff voting works: First, we tally everyone&apos;s first choice. If no option has a majority, then those who voted for the options with the least 1st-place votes have their vote changed to their second-ranked choice. The votes are then retallied, and the process is repeated until there is a clear winner.</p>
      <p>Touch or click the options in the order of your preference, then hit submit.</p>
      <p>If you make a mistake, please hit Cancel and start over.</p>
      {buttonsArray}
      <Button variant="primary" onClick={handleSubmit}>Submit</Button>{' '}
      <Link to={cancelPath}>
        <Button variant="secondary">Cancel</Button>
      </Link>
      <p></p>
      {selectionsArray}
    </React.Fragment>
  )
  // <ul>
  //   {theOptions}
  // </ul>
  // Form has several selects, each with the full menu of choices
  // <form onSubmit={handleSubmit}>
  //   <label></label>
  //   <select
  //     name={selection}
  //     value={optionValues(i)}
  //     onChange={handleChange}
  //   >
  //     {options}
  //   </select>
  // </form>
  //

  // ))
  // return (
  //   <React.Fragment>
  //     <ul>
  //       {theOptions}
  //     </ul>
  //
  //     <p> please refer to the options by number and write your selections as a sequence of numbers separated by spaces</p>
  //     <form onSubmit={handleSubmit}>
  //       <label>Your ballot</label>
  //       <input
  //         value={ballot.selections}
  //         name="selections"
  //         onChange={handleChange}
  //       />
  //
  //       <button type="submit">Submit</button>
  //
  //       <Link to={cancelPath}>
  //         <button>Cancel</button>
  //       </Link>
  //     </form>
  //
  //   </React.Fragment>
  // )
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
