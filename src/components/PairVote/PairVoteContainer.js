import React from 'react';
import { selectProfileRoute } from 'app/routes';
import { flipCoin } from 'lib';
import {
  ProfileContext,
  getCurrentProfile,
  getPairEntries,
} from 'contexts/Profile';
import PairVoteComponent from './PairVoteComponent';

const randomNextPair = (queue) => {
  const randomIndex = Math.floor(Math.random() * queue.length);
  return queue.length ? queue[randomIndex] : [null, null];
};


function PairVoteContainer(props) {
  const { history } = props;
  const { state } = React.useContext(ProfileContext);
  console.log('PairVoteContainer');

  const [pairId, setPairId] = React.useState(null);
  const [pair, setPair] = React.useState(null);
  const reverseOrder = flipCoin();
  const voteQueue = getPairEntries(state);

  React.useEffect(() => {
    console.log('useEffect');
    const [nextPairId, nextPair] = randomNextPair(voteQueue);
    setPairId(nextPairId);
    setPair(nextPair);
  }, [voteQueue]);


  if (!getCurrentProfile(state)) {
    console.warn('Whoops! No profile selected!');
    history.replace(selectProfileRoute);
    return null;
  }

  return (
    pair && pairId &&
    <PairVoteComponent
      {...props}
      pairId={pairId}
      leftBallot={reverseOrder ? pair.right : pair.left}
      rightBallot={reverseOrder ? pair.left : pair.right}
      skippedCount={pair.skipped}
    />
  );
}

export default PairVoteContainer;
