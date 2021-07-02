import styled from 'styled-components';
import { breakPoint } from 'components/common/common.style';

// TODO RESPONSIVE
export const PairContainer = styled.div`
  display: flex;
  align-content: space-between;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
`;

export const BallotBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-top: 2rem;

  > * {
    max-width: 45%;
    flex-grow: 1;
  }

  ${breakPoint.mediumAndSmaller} {
    flex-direction: column;
    > * {
      max-width: unset;
      width: 100%;
    }
  }
`;

export const OrText = styled.div`
  margin: 1rem;
  flex-grow: unset;
`;

export const SkippedText = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #999;
`;
