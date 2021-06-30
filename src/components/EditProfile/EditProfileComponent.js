import React from 'react';
import { addProfile, AppContext } from 'contexts/App';
import { Link } from 'react-router-dom';
import { homeRoute } from 'app/routes';
import {
  ListTextArea,
  ProfileContainer,
  ProfileCard,
  ProfileName,
  SaveButton
} from './EditProfile.style';

function EditProfileComponent({ history }) {
  const { state, dispatch } = React.useContext(AppContext);
  console.log(state);

  // TODO TRANSLATIONS
  const listLabel = 'List of comparable items';
  const listPlaceholder = '"Item 1"    [Optional: <tab> Image-URL]\n' +
    '"Item 2"    [Optional: <tab> Image-URL]\n' +
    '"Item 3"    [Optional: <tab> Image-URL]\n' +
    '...';
  const listMin = 10;
  const listMax = 20;

  const profileNameLabel = "List Name";
  const profileNamePlaceholder = "What's the name of this list?";


  return (
    <ProfileContainer>
      <header className="App-header">
        <ProfileCard>
          <ProfileName
            aria-label={profileNameLabel}
            label={profileNameLabel}
            placeholder={profileNamePlaceholder}
            helperText=""
            variant="outlined"
          />
          <ListTextArea
            aria-label={listLabel}
            label={listLabel}
            multiline
            rows={listMin}
            rowsMax={listMax}
            variant="outlined"
            placeholder={listPlaceholder}
          />
        </ProfileCard>
        <SaveButton
          variant="contained"
          color="primary"
          onClick={() => {
            // TODO actual profile.
            dispatch(addProfile('foobar', new Date().getTime()));
            history.push(homeRoute);
          }}
        >
          Save
        </SaveButton>
        <Link to={homeRoute}>Home</Link>
      </header>
    </ProfileContainer>
  );
}

export default EditProfileComponent;
