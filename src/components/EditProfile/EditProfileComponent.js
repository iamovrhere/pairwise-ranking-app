import React from 'react';
import logo from 'app/logo.svg';
import { Store } from 'contexts/Store';
import {
  Link
} from 'react-router-dom';
import {
  homeRoute
} from 'app/routes';

function NewProfileComponent() {
  const { state, dispatch } = React.useContext(Store);
  console.log(state);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Route test page!
        </p>
        <Link to={homeRoute}>Home</Link>
      </header>
    </div>
  );
}

export default NewProfileComponent;
