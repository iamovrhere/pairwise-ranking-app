import React from 'react';
import { addProfile, AppContext } from 'contexts/App';
import { viewProfileList, goBackOrHome } from 'app/routes';
import {
  ListTextArea,
  ProfileContainer,
  ProfileCard,
  ProfileName,
  SaveButton,
  BackButton
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

  const profileNameLabel = "Profile Name";
  const profileNamePlaceholder = "What's the name of this Profile?";


  return (
    <ProfileContainer>
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
      <BackButton
        variant="outlined"
        color="secondary"
        onClick={() => goBackOrHome(history)}
      >
        Back
      </BackButton>
      <SaveButton
        variant="contained"
        color="primary"
        onClick={() => {
          // TODO actual profile.
          dispatch(addProfile('foobar', new Date().getTime()));
          // TODO push to next.
          history.push(viewProfileList);
        }}
      >
        Save
      </SaveButton>
    </ProfileContainer>
  );
}

export default EditProfileComponent;
