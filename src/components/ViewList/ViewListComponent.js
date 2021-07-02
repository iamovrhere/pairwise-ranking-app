import React from 'react';
import { selectProfileRoute } from 'app/routes';
import {
  OptionalButton,
  CancelButton
} from 'components/common/common.style';
import LinearProgressBar from 'components/common/LinearProgressBar';
import {
  ListContainer,
} from './ViewList.style';
import ResultTable from './ResultTable'

/**
 * Silly easter egg.
 */
const orClickThreshold = 20;

function ViewListComponent({ history }) {
  // TODO move to the application state.
  const progress = 50;
  const totalItems = 100;

  return (
    <ListContainer>
      <LinearProgressBar value={progress} total={totalItems} />

      <ResultTable />
    </ListContainer>
  );
}

export default ViewListComponent;
