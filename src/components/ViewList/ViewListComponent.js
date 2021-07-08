import React from 'react';
import {
  ProfileContext,
  getCurrentProfile,
  getProgress,
  getTotalComparisons
} from 'contexts/Profile';
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
import ResultTable, { createRowData } from './ResultTable'


// TODO replace with real data.
const lizard = 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg';
const none = '';
const rows = [
  createRowData('Cupcake', lizard, 9877),
  createRowData('Donut', lizard, 8766),
  createRowData('Eclair', lizard, 7654),
  createRowData('Frozen yoghurt', lizard, 6543),
  createRowData('Gingerbread', none, 5432),
  createRowData('Honeycomb', lizard, 4322),
  createRowData('Ice cream sandwich', none, 3210),
  createRowData('Jelly Bean', lizard, 2109),
  createRowData('KitKat', none, 1098),
  createRowData('Lollipop', lizard, 987),
  createRowData('Marshmallow', none, 876),
  createRowData('Nougat', lizard, 765),
  createRowData('Oreo', none, 543),
  createRowData('Foobar', none, 0),
];
const maxScore = 9877;

const defaultOrderBy = 'score';
const defaultOrder = 'desc';

const resultsStartTitle = ': Ready to start!';
const resultsPartial = '(Partial)';
const resultsFinal = '(Results)';

function ViewListComponent({ history }) {
  // TODO move to the application state.
  const { state } = React.useContext(ProfileContext);
  const profile = getCurrentProfile(state);
  const progress = getProgress(state);
  const totalComparisons = getTotalComparisons(state);

  const resultsTitleSuffix = progress ?
    (progress >= totalComparisons ? resultsFinal : resultsPartial) :
    resultsStartTitle;
  const resultsTitle = `${profile.name} ${resultsTitleSuffix}`;

  return (
    <ListContainer>
      <ProgressContainer>
        <LinearProgressBar
          value={progress}
          total={totalComparisons}
        />
        {
          (progress < totalComparisons) &&
          (<PrimaryButton
            onClick={() => history.push(voteOnPairs)}
          >
            {progress ? 'Continue' : 'Start'}
          </PrimaryButton>)
        }

      </ProgressContainer>

      <ResultTable
        rows={profile.list}
        maxScore={maxScore}
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
