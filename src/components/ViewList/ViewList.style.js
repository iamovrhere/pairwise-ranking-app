import styled from 'styled-components';
import { breakPoint } from 'components/common/common.style';

export const ListContainer = styled.div`
  display: flex;
  align-content: space-between;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  width: 80%;
  max-width: 100%;

  ${breakPoint.mediumAndSmaller} {
    width: 100%;
  }
`;

export const ProgressContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  margin: 1rem 0;
`;
