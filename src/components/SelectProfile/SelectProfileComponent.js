import React from 'react';
import PropTypes from 'prop-types';
import {
  ProfileContext,
  getProfiles,
} from 'contexts/Profile';
import { setCurrentProfile } from 'contexts/Profile/actions';
import {
  GetStartedMessage,
  ListContainer,
  ListItemSpaceBetweenText,
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
  const { id, name, dateTime, listLength, progress, totalComparisons, onClick } = props;

  return (
    <ListItem button key={id} onClick={onClick}>
      <ListItemText
        primary={<ListItemSpaceBetweenText>
          <span>{name}</span>
          <span>{
            `    ${Math.round(progress / totalComparisons * 100)}%`
          }</span>
        </ListItemSpaceBetweenText>}
        secondary={
          <ListItemSpaceBetweenText>
            <span>{
              `${listLength} rows ` +
              `(${progress}/${totalComparisons})`
            }</span>
            <span>{new Date(dateTime).toLocaleString()}</span>
          </ListItemSpaceBetweenText>
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
  listLength: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  totalComparisons: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
};

function SelectProfileComponent({ history }) {
  const { state, dispatch } = React.useContext(ProfileContext);
  const profiles = getProfiles(state);
  const classes = useListStyles();

  const emptyList = `Create a profile to get started`;
  return (
    <>
      <ListContainer>
        {
          profiles.length ?
            (
              <List className={classes.root}>
                {
                  profiles.map(({ name, id, dateTime, list, pairs, totalComparisons }) => {
                    const listLength = Object.values(list).length;
                    const progress = totalComparisons - pairs.length;
                    return (
                      <RowComponent
                        key={id}
                        id={id}
                        name={name}
                        dateTime={dateTime}
                        progress={progress}
                        listLength={listLength}
                        totalComparisons={totalComparisons}
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
