import React from 'react';
import { AppContext } from 'contexts/App';
import {
  Link
} from 'react-router-dom';
import {
  editProfileRoute
} from 'app/routes';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function HomeComponent() {
  const { state, dispatch } = React.useContext(AppContext);
  const { profiles } = state;

  return (
    <header className="App-header">

      {profiles.length ?
        profiles.map(({ name, key }) => (
          <div key={key}>{`${name} ${key}`}</div>
        )) :
        'None'
      }
      <Link to={editProfileRoute}>
        <Fab
          color="primary"
          aria-label="add"
        >
          <AddIcon />
        </Fab>
      </Link>

      <p>
        Edit <code>src/App.js</code> and save to reload.
      </p>

    </header>
  );
}

export default HomeComponent;
