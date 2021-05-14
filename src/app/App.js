import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { } from 'react-transition-group';
import './App.css';
import { AppContext } from 'contexts/App';
import { routeList } from './routes';

import Home from 'components/Home';
import EditProfile from 'components/EditProfile';

export const homeRoute = '/';
export const editProfileRoute = '/edit-profile';

function App() {
  const { state, dispatch } = React.useContext(AppContext);
  console.log(state);

  console.log(editProfileRoute, EditProfile);
  console.log(homeRoute, Home);

  return (
    <div className="App">
      <Router>
        <Switch>
          {
            routeList.map(({ path, component }) => (
              <Route path={path} component={component} />
            ))
          }
        </Switch>
      </Router>
    </div >
  );
}

export default App;
