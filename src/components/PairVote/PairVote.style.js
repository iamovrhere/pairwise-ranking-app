import {
  Button,
  Card,
  TextField
} from '@material-ui/core';
import { breakPoint } from 'components/common/common.style';
import styled from 'styled-components';

// TODO RESPONSIVE
export const PairContainer = styled.div`
  display: flex;
  align-content: space-between;
  flex-direction: column;
  align-items: center;

`;

export const BallotBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  > * {
    max-width: 45%;
  }

  ${breakPoint.mediumAndSmaller} {
    flex-direction: column;
    > * {
      max-width: unset;
    }
  }
`;

export const OrText = styled.div`
  margin: 1rem 0;
`;

export const SkippedText = styled.div`
  margin-top: 1rem;
  font-size: 1rem;
  color: #999;
`;
