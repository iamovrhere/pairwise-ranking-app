import React from 'react';
import { selectProfileRoute, voteOnPairs } from 'app/routes';
import {
  PrimaryButton,
  CancelButton
} from 'components/common/common.style';
import LinearProgressBar from 'components/common/LinearProgressBar';
import {
  ListContainer,
  ProgressContainer,
} from './ViewList.style';
import ResultTable, { createData } from './ResultTable'


// TODO replace with real data.
const lizard = 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg';
const none = '';
const rows = [
  createData(10, 'Cupcake', lizard, 9877),
  createData(9, 'Donut', lizard, 8766),
  createData(8, 'Eclair', lizard, 7654),
  createData(7, 'Frozen yoghurt', lizard, 6543),
  createData(6, 'Gingerbread', none, 5432),
  createData(5, 'Honeycomb', lizard, 4322),
  createData(4, 'Ice cream sandwich', none, 3210),
  createData(3, 'Jelly Bean', lizard, 2109),
  createData(2, 'KitKat', none, 1098),
  createData(1, 'Lollipop', lizard, 987),
  createData(0, 'Marshmallow', none, 876),
  createData(0, 'Nougat', lizard, 765),
  createData(0, 'Oreo', none, 543),
];

const defaultOrderBy = 'rank';
const defaultOrder = 'desc';

const resultsStartTitle = 'Ready to start';
const resultsPartial = 'Partial Results';
const resultsFinal = 'Final Results';

function ViewListComponent({ history }) {
  // TODO move to the application state.
  const progress = 1;
  const totalItems = 100;

  const resultsTitle = progress ?
    (progress >= totalItems ? resultsFinal : resultsPartial) :
    resultsStartTitle;

  return (
    <ListContainer>
      <ProgressContainer>
        <LinearProgressBar
          value={progress}
          total={totalItems}
        />
        {
          (progress < totalItems) &&
          (<PrimaryButton
            onClick={() => history.push(voteOnPairs)}
          >
            {progress ? 'Continue' : 'Start'}
          </PrimaryButton>)
        }

      </ProgressContainer>

      <ResultTable
        rows={rows}
        defaultOrderBy={defaultOrderBy}
        defaultOrder={defaultOrder}
        title={resultsTitle}
      />
      <CancelButton
        onClick={() => history.replace(selectProfileRoute)}
      >
        Switch Profiles
      </CancelButton>
    </ListContainer>
  );
}

export default ViewListComponent;
