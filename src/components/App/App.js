import React from 'react'
import { Route, withRouter } from 'react-router-dom'

import Elections from '../routes/Elections'
import Election from '../routes/Election'
import ElectionEdit from '../routes/ElectionEdit'
import ElectionCreate from '../routes/ElectionCreate'
// import Home from '../routes/Home'

// import AuthenticatedRoute from '../AuthenticatedRoute/AuthenticatedRoute'
// import AutoDismissAlert from '../AutoDismissAlert/AutoDismissAlert'
// import SignUp from '../SignUp/SignUp'
// import SignIn from '../SignIn/SignIn'
// import SignOut from '../SignOut/SignOut'
// import ChangePassword from '../ChangePassword/ChangePassword'
import Auth from '../Auth/Auth'

const App = props => (
  <React.Fragment>
    <Auth />
    <h3>{props.location.state ? props.location.state.msg : null}</h3>
    <Route exact path='/elections' component={Elections} />
    <Route exact path='/create-election' component={ElectionCreate} />
    <Route exact path='/elections/:id' component={Election} />
    <Route exact path='/elections/:id/edit' component={ElectionEdit} />

  </React.Fragment>
)

export default withRouter(App)
