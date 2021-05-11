import React from 'react';
import logo from 'app/logo.svg';
import { ProfileContext } from 'contexts/Profile';
import {
  Link
} from 'react-router-dom';
import {
  homeRoute
} from 'app/routes';

function NewProfileComponent() {
  const { state, dispatch } = React.useContext(ProfileContext);
  console.log(state);

  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Route test page!
      </p>
      <Link to={homeRoute}>Home</Link>
    </header>
  );
}

export default NewProfileComponent;
