import React from 'react';
import { AppContext } from 'contexts/App';
import { ListContainer } from './SelectProfile.style';
import {
  editProfileRoute
} from 'app/routes';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

function HomeComponent({ history }) {
  const { state, dispatch } = React.useContext(AppContext);
  const { profiles } = state;

  const emptyList = 'Create a profile to get started';
  return (
    <>
      <ListContainer>
        {profiles.length ?
          profiles.map(({ name, key }) => (
            <div key={key}>{`${name} ${key}`}</div>
          )) :
          emptyList
        }
      </ListContainer>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => history.push(editProfileRoute)}
      >
        <AddIcon />
      </Fab>
    </>
  );
}

export default HomeComponent;
