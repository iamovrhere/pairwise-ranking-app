import React from 'react';
import { goBackOrHome } from 'app/routes';
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

const flipCoin = () => Math.round(Math.random() * 2) % 2;
// TODO replace with actual code that fetches the Card info.
/**
 * @return {{id: string, image: string | null, title: string}}
 */
const generateCard = () => {
  const text = 'Foobar ' + Math.round(Math.random() * 10);
  return {
    img: flipCoin() ? 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg' : null,
    title: text,
    id: text,
  };
};

/**
 * Silly easter egg.
 */
const orClickThreshold = 20;

function PairVoteComponent({ history }) {
  // TODO move to the application state.
  const [orClickCount, setOrClickCount] = React.useState(0);
  const [skippedTimes, setSkippedTimes] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [ballotValues, setBallotValues] = React.useState([
    generateCard(),
    generateCard()
  ]);

  const skippedPhrase = skippedTimes === 1 ?
    `1 time` : `${skippedTimes} times`;

  const totalItems = 200;

  const castTheVote = id => {
    setProgress(progress + 1);
    setBallotValues([
      generateCard(),
      generateCard()
    ]);
    console.log(`Voted for: ${id}`);
  };

  return (
    <PairContainer>
      <LinearProgressBar value={progress} total={totalItems} />
      <BallotBox>
        <BallotCard
          img={ballotValues[0].img}
          title={ballotValues[0].title}
          onClick={() => castTheVote(ballotValues[0].id)}
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
          img={ballotValues[1].img}
          title={ballotValues[1].title}
          onClick={() => castTheVote(ballotValues[1].id)}
        />
      </BallotBox>
      <SkippedText>Skipped: {skippedPhrase}</SkippedText>
      <OptionalButton
        onClick={() => {
          setBallotValues([
            generateCard(),
            generateCard()
          ]);
          setSkippedTimes(skippedTimes + 1);
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
