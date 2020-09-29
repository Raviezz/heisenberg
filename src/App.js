import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Login from './components/Login';
import SignInSide from './components/SignInSide';
import { Grommet } from 'grommet';
import { history } from './redux/_helpers';
import { PrivateRoute } from './gaurds/ProtectedRoute';
import Dashboard from './components/_dashboard/Dashboard';

class App extends React.Component {
  constructor(props) {
    super(props);

    history.listen((location, action) => {

    });
  }

  render() {
    return (
      <Grommet plain>
        <Router history={history}>
          <Switch>
            <PrivateRoute exact path="/home" component={Dashboard} />
            <Route path="/login" exact render={props => <SignInSide {...props} />} />
          </Switch>
        </Router>
      </Grommet>
    );
  }
}


export default App;
