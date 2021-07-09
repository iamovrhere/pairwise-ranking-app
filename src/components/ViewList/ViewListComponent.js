import React from 'react';
import {
  ProfileContext,
  getCurrentProfile,
  getListValues,
  getMaxScore,
  getProgress,
  getTotalComparisons,
} from 'contexts/Profile';
import {
  selectProfileRoute,
  voteOnPairs
} from 'app/routes';
import {
  PrimaryButton,
  CancelButton
} from 'components/common/common.style';
import LinearProgressBar from 'components/common/LinearProgressBar';
import {
  ListContainer,
  ProgressContainer,
} from './ViewList.style';
import ResultTable from './ResultTable'

const defaultOrderBy = 'score';
const defaultOrder = 'desc';
const defaultRowCount = 25;

const resultsStartTitle = ': Ready to start!';
const resultsPartial = '(Partial)';
const resultsFinal = '(Results)';

function ViewListComponent({ history }) {
  // TODO move to the application state.
  const { state } = React.useContext(ProfileContext);
  const profile = getCurrentProfile(state);

  if (!profile) {
    console.warn('Whoops! No profile selected!');
    history.replace(selectProfileRoute);
    return null;
  }

  const progress = getProgress(state);
  const totalComparisons = getTotalComparisons(state);
  const maxScore = getMaxScore(state);
  const listRows = getListValues(state);

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
        rows={listRows}
        maxScore={maxScore}
        defaultOrderBy={defaultOrderBy}
        defaultOrder={defaultOrder}
        defaultRowCount={defaultRowCount}
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
