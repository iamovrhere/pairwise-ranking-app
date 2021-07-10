import React from 'react';
import {
  goBackOrHome,
} from 'app/routes';
import {
  ProfileContext,
  getProgress,
  getTotalComparisons,
  votePair,
  skipPair
} from 'contexts/Profile';
import {
  OptionalButton,
  CancelButton
} from 'components/common/common.style';
import LinearProgressBar from 'components/common/LinearProgressBar';
import BallotCard from './BallotCard';
import {
  BallotBox,
  PairContainer,
  OrText,
  SkippedText,
} from './PairVote.style';

/**
 * Silly easter egg.
 */
const orClickThreshold = 20;

/**
 *
 * @param {number} skipped
 * @return {string}
 */
const skippedPhrase = (skipped) => (skipped === 1) ?
  `1 time` : `${skipped} times`;

function PairVoteComponent({
  history,
  pairId,
  leftBallot,
  rightBallot,
  skippedCount,
}) {
  const { state, dispatch } = React.useContext(ProfileContext);
  console.log('PairVoteComponent', state);

  const [orClickCount, setOrClickCount] = React.useState(0);

  const progress = getProgress(state);
  const totalComparisons = getTotalComparisons(state);

  React.useEffect(() => {
    if (progress >= totalComparisons) {
      goBackOrHome(history);
    }
  }, [history, progress, totalComparisons])

  const castVote = (pairId, id) => {
    dispatch(votePair(pairId, id));
    setOrClickCount(0);
    console.log(`Voted for: ${id}`);
  };

  return (
    <PairContainer>
      <LinearProgressBar value={progress} total={totalComparisons} />
      <BallotBox>
        <BallotCard
          img={leftBallot.image}
          title={leftBallot.name}
          onClick={() => castVote(pairId, leftBallot.id)}
        />
        <OrText onClick={() => {
          setOrClickCount(orClickCount + 1);
          if (orClickCount && orClickCount % orClickThreshold === 0) {
            alert(`You chose "OR", very funny!`);
          }
        }}>
          OR
        </OrText>
        <BallotCard
          img={rightBallot.image}
          title={rightBallot.name}
          onClick={() => castVote(pairId, rightBallot.id)}
        />
      </BallotBox>
      <SkippedText>Skipped: {skippedPhrase(skippedCount)}</SkippedText>
      <OptionalButton
        onClick={() => {
          dispatch(skipPair(pairId));
          console.log(`Skipped: ${pairId}`);
        }}
      >
        Skip
      </OptionalButton>
      <CancelButton
        onClick={() => goBackOrHome(history)}
      >
        Back
      </CancelButton>
    </PairContainer>
  );
}

export default PairVoteComponent;
