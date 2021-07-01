import {
  Button,
  Card,
  TextField
} from '@material-ui/core';
import styled from 'styled-components';

// TODO RESPONSIVE
export const ProfileContainer = styled.div`
  width: 60%;
  margin: auto;
`;

export const ProfileCard = styled(Card)`
  width: 100%;
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

export const SaveButton = styled(Button)`
  &.MuiButton-root {
    width: 10rem;
    margin: 1rem;
  }
`;

export const BackButton = styled(Button)`
  &.MuiButton-root {
    width: 10rem;
    margin: 1rem;
  }
`;
