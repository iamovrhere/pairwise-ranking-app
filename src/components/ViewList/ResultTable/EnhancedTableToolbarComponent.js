/**
 * Modified from: https://material-ui.com/components/tables/#sorting-amp-selecting
 */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { lighten, makeStyles } from '@material-ui/core/styles';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
}));

/**
 * Creates title of the table OR the toolbar when in select mode.
 * Select mode is incomplete atm.
 *
 * @param {{
  *  numSelected: number,
  *  title: string,
  * }} props
  */
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { title, numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
          <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
            {title}
          </Typography>
        )}

      {numSelected > 0 ? (
        <Tooltip title="Clear coming soon">
          <IconButton aria-label="Clear coming soon">
            {/* <DeleteIcon /> */}
            COMING SOON!
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default EnhancedTableToolbar;
