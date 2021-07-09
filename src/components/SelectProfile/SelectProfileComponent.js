import React from 'react';
import PropTypes from 'prop-types';
import {
  ProfileContext,
  getProfiles,
  setCurrentProfile
} from 'contexts/Profile';
import {
  GetStartedMessage,
  ListContainer,
  ListItemSecondaryText,
  useListStyles,
} from './SelectProfile.style';
import {
  editProfileRoute,
  viewProfileList
} from 'app/routes';
import {
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import {
  PrimaryFab
} from 'components/common/common.style';

function RowComponent(props) {
  const { id, name, dateTime, progress, totalComparisons, onClick } = props;

  return (
    <ListItem button key={id} onClick={onClick}>
      <ListItemText
        primary={name}
        secondary={
          <ListItemSecondaryText>
            <span>{
              `${progress}/${totalComparisons} ` +
              `(${Math.round(progress / totalComparisons * 100)}%)`
            }</span>
            <span>{new Date(dateTime).toLocaleString()}</span>
          </ListItemSecondaryText>
        }

      >
      </ListItemText>
    </ListItem>
  );
}

RowComponent.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  dateTime: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  totalComparisons: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

function SelectProfileComponent({ history }) {
  const { state, dispatch } = React.useContext(ProfileContext);
  const profiles = getProfiles(state);
  const classes = useListStyles();

  const emptyList = `Create a profile to get started (UI demo only)`;
  return (
    <>
      <ListContainer>
        {
          profiles.length ?
            (
              <List className={classes.root}>
                {
                  profiles.map(({ name, id, dateTime, pairs, voted }) => {
                    const progress = Object.keys(voted).length;
                    const total = progress + Object.keys(pairs).length;
                    return (
                      <RowComponent
                        key={id}
                        id={id}
                        name={name}
                        dateTime={dateTime}
                        progress={progress}
                        totalComparisons={total || 1}
                        onClick={() => {
                          dispatch(setCurrentProfile(id));
                          history.push(viewProfileList);
                        }}
                      />
                    );
                  })
                }
              </List>
            ) :
            <GetStartedMessage>
              {emptyList}
            </GetStartedMessage>
        }
        <PrimaryFab
          aria-label="add"
          onClick={() => history.push(editProfileRoute)}
        >
          <AddIcon />
        </PrimaryFab>
      </ListContainer>

    </>
  );
}

export default SelectProfileComponent;
