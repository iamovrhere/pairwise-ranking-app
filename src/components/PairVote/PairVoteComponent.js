import React from 'react';
import {
  goBackOrHome,
} from 'app/routes';
import {
  ProfileContext,
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
  pairIndex,
  leftBallot,
  rightBallot,
  skippedCount,
  progress,
  totalComparisons
}) {
  const { dispatch } = React.useContext(ProfileContext);

  const [orClickCount, setOrClickCount] = React.useState(0);

  const castVote = (pairIndex, id) => {
    dispatch(votePair(pairIndex, id));
    setOrClickCount(0);
    console.log(`Voted for: ${id}`);
  };

  return (
    leftBallot && rightBallot ?
      <PairContainer>
        <LinearProgressBar value={progress} total={totalComparisons} />
        <BallotBox>
          <BallotCard
            img={leftBallot.image}
            title={leftBallot.name}
            onClick={() => castVote(pairIndex, leftBallot.id)}
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
            onClick={() => castVote(pairIndex, rightBallot.id)}
          />
        </BallotBox>
        <SkippedText>Skipped: {skippedPhrase(skippedCount)}</SkippedText>
        <OptionalButton
          onClick={() => {
            dispatch(skipPair(pairIndex));
            console.log(`Skipped: ${rightBallot.id} vs. ${leftBallot.id}`);
          }}
        >
          Skip
      </OptionalButton>
        <CancelButton
          onClick={() => goBackOrHome(history)}
        >
          Back
      </CancelButton>
      </PairContainer> :
      null
  );
}

export default PairVoteComponent;
