import {
  Button,
  Fab,
  colors
} from '@material-ui/core';
import styled from 'styled-components';
import { createMuiTheme } from '@material-ui/core/styles';

// https://material-ui.com/customization/default-theme/
// Nice tool for palette mixing:
// https://material-ui.com/customization/color/
export const AppTheme = createMuiTheme({
  palette: {
    primary: {
      // Slightly darker than `colors.lightGreen`
      // Better contrast and more on theme.
      main: '#689f38',
    },
    secondary: colors.orange
  },
});

// https://material-ui.com/customization/breakpoints/
// 0px     600px    960px    1280px   1920px
const md = 960;
/**
 * Usage:
 * ${breakPoint.mediumAndSmaller} {
 *    ... // styling
 *  }
 */
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

export const PrimaryFab = styled(Fab).attrs({
  color: "primary"
})`
  &.MuiFab-root {
    margin: .5rem;
  }
`;
