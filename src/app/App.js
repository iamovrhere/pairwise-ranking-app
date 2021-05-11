import React from 'react';
import './App.css';
import { ProfileContext } from 'contexts/Profile';
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
  const { state, dispatch } = React.useContext(ProfileContext);
  console.log(state);

  return (
    <div className="App">
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
    </div>
  );
}

export default App;
