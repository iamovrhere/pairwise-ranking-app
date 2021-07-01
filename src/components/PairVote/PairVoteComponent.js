import React from 'react';
import { goBackOrHome } from 'app/routes';
import {
  OptionalButton,
  CancelButton
} from 'components/common/common.style';
import BallotCard from './BallotCard';
import {
  BallotBox,
  PairContainer,
  OrText,
  SkippedText,
} from './PairVote.style';

function PairVoteComponent({ history }) {

  const skippedTimes = 2;
  const skippedPhrase = skippedTimes === 1 ?
    `1 time` : `${skippedTimes} times`;

  return (
    <PairContainer>
      <BallotBox>
        <BallotCard
          img="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
          title="Foobar 1 Foobar 1 Foobar 1 Foobar 1 "
          onClick={() => console.log('voted foobar 1')}
        />
        <OrText>OR</OrText>
        <BallotCard
          title="Foobar 2 Foobar 2 Foobar 2 Foobar 2 Foobar 2 Foobar 2"
          onClick={() => console.log('voted foobar 2')}
        />
      </BallotBox>
      <SkippedText>Skipped: {skippedPhrase}</SkippedText>
      <OptionalButton
        onClick={() => alert('skip')}
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
