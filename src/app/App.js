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

function App() {
  const { state, dispatch } = React.useContext(AppContext);
  console.log(state);

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
