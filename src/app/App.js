import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Store } from 'contexts/Store';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import {
  homeRoute,
  editProfileRoute
} from './routes';

import Home from 'components/Home';
import EditProfile from 'components/EditProfile';

function App() {
  const { state, dispatch } = React.useContext(Store);
  console.log(state);

  return (
    <Router>
      <Switch>
        <Route path={editProfileRoute}>
          <EditProfile />
        </Route>
        <Route path={homeRoute}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
