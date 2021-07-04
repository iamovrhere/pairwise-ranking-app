import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  container: {
    minHeight: 200,
    maxHeight: 440,
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    borderRadius: '1rem'
  },
  table: {
    minWidth: 200,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

export const RowImage = styled.img`
  width: 100%;
`;
