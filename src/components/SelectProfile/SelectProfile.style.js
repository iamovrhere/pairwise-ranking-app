import styled from 'styled-components';
import {
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { breakPoint } from 'components/common/common.style';

const blockMargin = '1rem';
export const ListContainer = styled.div`
  display: flex;
  align-content: space-between;
  flex-direction: column;
  align-items: center;

  margin: 2rem auto;

  width: 80%;
  max-width: 100%;

  ${breakPoint.mediumAndSmaller} {
    width: 100%;
  }
`;

export const useListStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
    position: 'relative',
    overflow: 'auto',
    maxHeight: '60vh',
    margin: blockMargin,
    color: theme.palette.primary.dark,
    borderRadius: '1rem'
  },
}));


export const GetStartedMessage = styled(Paper).attrs({
  elevation: 10
})`
  display: flex;
  align-items: center;
  min-height: 20vh;

  margin: ${blockMargin};
  padding: 2rem;
  border-radius: 1rem;
`;

export const ListItemSpaceBetweenText = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between
`;
