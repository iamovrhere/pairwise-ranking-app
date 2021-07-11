import React from 'react';
import { selectProfileRoute, goBackOrHome } from 'app/routes';
import { flipCoin } from 'lib';
import {
  ProfileContext,
  getCurrentProfile,
  getPairs,
  getProgress,
  getTotalComparisons,
} from 'contexts/Profile';
import PairVoteComponent from './PairVoteComponent';

const randomNextPair = (queue) => {
  const nextIndex = Math.floor(Math.random() * queue.length);
  const nextPair = queue.length ? queue[nextIndex] : [];
  return {
    nextIndex,
    nextPair
  }
};

function PairVoteContainer(props) {
  const { history } = props;
  const { state } = React.useContext(ProfileContext);

  const [pairIndex, setPairIndex] = React.useState(null);
  const [pair, setPair] = React.useState(null);
  const reverseOrder = flipCoin();

  const voteQueue = getPairs(state);
  const progress = getProgress(state);
  const totalComparisons = getTotalComparisons(state);

  React.useEffect(() => {
    if (progress >= totalComparisons) {
      goBackOrHome(history);
    }
  }, [history, progress, totalComparisons])

  React.useEffect(() => {
    const { nextIndex, nextPair } = randomNextPair(voteQueue);
    setPairIndex(nextIndex);
    setPair(nextPair);
  }, [voteQueue]);


  if (!getCurrentProfile(state)) {
    console.warn('Whoops! No profile selected!');
    history.replace(selectProfileRoute);
    return null;
  }

  return (
    pair ?
      <PairVoteComponent
        {...props}
        pairIndex={pairIndex}
        leftBallot={reverseOrder ? pair.right : pair.left}
        rightBallot={reverseOrder ? pair.left : pair.right}
        skippedCount={pair.skipped}
        progress={progress}
        totalComparisons={totalComparisons}
      /> :
      null
  );
}

export default PairVoteContainer;
