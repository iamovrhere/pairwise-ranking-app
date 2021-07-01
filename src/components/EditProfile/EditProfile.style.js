import {
  Card,
  TextField
} from '@material-ui/core';
import styled from 'styled-components';

// TODO RESPONSIVE
export const ProfileContainer = styled.div`
  margin: auto;
`;

export const ProfileCard = styled(Card)`
  padding: 1rem;
`;

export const ProfileName = styled(TextField)`
  &.MuiFormControl-root {
    width: 95%;
    margin: 1rem;
  }
`;

export const ListTextArea = styled(TextField)`
  &.MuiFormControl-root {
    width: 95%;
    margin: 1rem;
  }
`;
