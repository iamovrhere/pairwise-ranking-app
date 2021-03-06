import React from 'react';
import {
  IconButton,
  Tooltip,
} from '@material-ui/core';
import {
  EmojiObjectsOutlined as LightBulbOutlinedIcon,
} from '@material-ui/icons';
import { ProfileContext } from 'contexts/Profile';
import { asyncCreateProfile } from 'contexts/Profile/middleware';
import { viewProfileList, goBackOrHome } from 'app/routes';
import {
  PrimaryButton,
  CancelButton
} from 'components/common/common.style';
import {
  ListTextArea,
  ProfileContainer,
  ProfileCard,
  ProfileName,
} from './EditProfile.style';

const SAMPLE_TITLE = 'Apples & Oranges';
const SAMPLE_DATA = `Honey Crisp    https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Honeycrisp.jpg/600px-Honeycrisp.jpg
Tangerine     https://upload.wikimedia.org/wikipedia/commons/2/2a/TangerineFruit.jpg
Mandarin Orange    https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/Mandarin_Oranges_%28Citrus_Reticulata%29.jpg/800px-Mandarin_Oranges_%28Citrus_Reticulata%29.jpg
Blood Orange     https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/BloodOrange.jpg/800px-BloodOrange.jpg
Ambrosia     https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Ambrosia_apples_2017_A3.jpg/600px-Ambrosia_apples_2017_A3.jpg
Golden Delicious    https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Golden_delicious_apple.jpg/800px-Golden_delicious_apple.jpg

`;

function EditProfileComponent({ history }) {
  const context = React.useContext(ProfileContext);
  const [titleText, setTitleText] = React.useState('');
  const [listText, setListText] = React.useState('');

  // TODO TRANSLATIONS
  const listLabel = 'List of comparable items';
  const listPlaceholder = '"Item 1"    [Optional: <4-spaces> Image-URL]\n' +
    '"Item 2"    [Optional: <4-spaces> Image-URL]\n' +
    '"Item 3"    [Optional: <4-spaces> Image-URL]\n' +
    '\n\n' +
    'Recommended for lists under 500 (124,750 comparisons)\n' +
    '...';
  const listMin = 10;
  const listMax = 20;

  const profileNameLabel = "List Name";
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
          onChange={(e) => {
            setTitleText(e.target.value);
          }}
          value={titleText}
          InputLabelProps={{ shrink: !!titleText }}
        />
        <ListTextArea
          aria-label={listLabel}
          label={listLabel}
          multiline
          rows={listMin}
          rowsMax={listMax}
          variant="outlined"
          placeholder={listPlaceholder}
          onChange={(e) => {
            setListText(e.target.value);
          }}
          value={listText}
          InputLabelProps={{ shrink: !!listText }}
        />
        {
          <Tooltip
            title="Use Sample Content"
            style={{ visibility: listText ? 'hidden' : 'visible' }}
          >
            <IconButton
              size="small"
              aria-label="Use Sample Content"
              onClick={() => {
                setTitleText(SAMPLE_TITLE);
                setListText(SAMPLE_DATA);
              }}
              disabled={!!listText}
            >
              <LightBulbOutlinedIcon />
              Sample
            </IconButton>
          </Tooltip>
        }
      </ProfileCard>
      <CancelButton
        onClick={() => goBackOrHome(history)}
      >
        Back
      </CancelButton>
      <PrimaryButton
        onClick={() => {
          // TODO add spinner.
          asyncCreateProfile(context, titleText, listText)
            .then(() => history.push(viewProfileList));
        }}
        disabled={!listText.trim() || !titleText.trim()}
      >
        Save
      </PrimaryButton>
    </ProfileContainer>
  );
}

export default EditProfileComponent;
