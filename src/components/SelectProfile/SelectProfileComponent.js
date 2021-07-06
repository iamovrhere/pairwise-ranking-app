import React from 'react';
import PropTypes from 'prop-types';
import { ProfileContext } from 'contexts/Profile';
import {
  GetStartedMessage,
  ListContainer,
  ListItemSecondaryText,
  useListStyles,
} from './SelectProfile.style';
import {
  editProfileRoute
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
  const { id, name, dateTime, progress, totalComparisons } = props;

  return (
    <ListItem button key={id}>
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
};

function SelectProfileComponent({ history }) {
  const { state } = React.useContext(ProfileContext);
  const { profiles } = state;
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
                  profiles.map(({ name, id, dateTime, pairs }) => (
                    <RowComponent
                      key={id}
                      id={id}
                      name={name}
                      dateTime={dateTime}
                      progress={10}
                      totalComparisons={pairs.length}
                    />
                  ))
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
