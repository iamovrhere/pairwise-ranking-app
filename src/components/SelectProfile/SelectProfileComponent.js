import React from 'react';
import PropTypes from 'prop-types';
import { AppContext } from 'contexts/App';
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
  const { id, name, date, progress, totalComparisons } = props;

  return (
    <ListItem button key={id}>
      <ListItemText
        primary={`${name} ${id}`}
        secondary={
          <ListItemSecondaryText>
            <span>{
              `${progress}/${totalComparisons} ` +
              `(${Math.round(progress / totalComparisons * 100)}%)`
            }</span>
            <span>{new Date(date).toLocaleString()}</span>
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
  date: PropTypes.number.isRequired,
  progress: PropTypes.number.isRequired,
  totalComparisons: PropTypes.number.isRequired,
};

function SelectProfileComponent({ history }) {
  const { state, dispatch } = React.useContext(AppContext);
  const { profiles } = state;
  const classes = useListStyles();

  const emptyList = 'Create a profile to get started';
  return (
    <>
      <ListContainer>
        {
          profiles.length ?
            (
              <List className={classes.root}>
                {
                  profiles.map(({ name, key }) => (
                    <RowComponent
                      id={key}
                      name={name}
                      date={new Date().getTime()}
                      progress={10}
                      totalComparisons={200}
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
