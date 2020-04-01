import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import Elections from './components/routes/Elections'
import Election from './components/routes/Election'
import ElectionEdit from './components/routes/ElectionEdit'
import ElectionCreate from './components/routes/ElectionCreate'
import Home from './components/routes/Home'

const App = props => (
  <React.Fragment>
    <h3>{props.location.state ? props.location.state.msg : null}</h3>
    <Route exact path='/' component={Home} />
    <Route exact path='/elections' component={Elections} />
    <Route exact path='/create-election' component={ElectionCreate} />
    <Route exact path='/elections/:id' component={Election} />
    <Route exact path='/elections/:id/edit' component={ElectionEdit} />
  </React.Fragment>
)

export default withRouter(App)
