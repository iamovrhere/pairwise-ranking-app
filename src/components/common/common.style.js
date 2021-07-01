import {
  Button,
} from '@material-ui/core';
import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

// https://material-ui.com/customization/default-theme/
export const AppTheme = createMuiTheme({
  palette: {
  }
});

// https://material-ui.com/customization/breakpoints/
// 0px     600px    960px    1280px   1920px
const sm = 600;
const md = 960;
const lg = 1280;
const xl = 1920;
export const breakPoint = {
  mediumAndSmaller: `@media (max-width: ${md}px)`
};

export const CommonButton = styled(Button)`
  &.MuiButton-root {
    width: 10rem;
    margin: .5rem;
  }
`;

export const PrimaryButton = styled(CommonButton).attrs({
  variant: "contained",
  color: "primary"
})``;

export const OptionalButton = styled(CommonButton).attrs({
  variant: "contained",
})``;


export const CancelButton = styled(CommonButton).attrs({
  variant: "outlined",
  color: "secondary"
})``;



