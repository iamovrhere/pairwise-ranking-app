import React from 'react';
import { PROFILE_ADD, ProfileContext } from 'contexts/Profile';
import {
  Link
} from 'react-router-dom';
import {
  editProfileRoute
} from 'app/routes';

function HomeComponent() {
  const { state, dispatch } = React.useContext(ProfileContext);
  const { profiles } = state;

  return (
    <header className="App-header">

      {profiles.map((profile) => (
        <div>{profile}</div>
      ))}
      <button onClick={() => dispatch({
        type: PROFILE_ADD, data: 'foobar ' + new Date().toISOString()
      })} >
        New Profile
      </button>
      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>
      <Link to={editProfileRoute}>Route Test</Link>
    </header>
  );
}

export default HomeComponent;
