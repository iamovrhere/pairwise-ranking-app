import React from 'react';
import logo from 'app/logo.svg';
import { Store } from 'contexts/Store';
import {
  Link
} from 'react-router-dom';
import {
  editProfileRoute
} from 'app/routes';

function HomeComponent() {
  const { state, dispatch } = React.useContext(Store);
  console.log(state);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Link to={editProfileRoute}>Route Test</Link>
      </header>
    </div>
  );
}

export default HomeComponent;
