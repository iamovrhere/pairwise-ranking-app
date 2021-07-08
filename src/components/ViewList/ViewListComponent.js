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
import ResultTable from './ResultTable'

// TODO replace with real data.
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
