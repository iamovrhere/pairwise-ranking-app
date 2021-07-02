/**
 * From: https://material-ui.com/components/progress/
 *
 * And modified.
 */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 10,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 10,
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});

/**
 * Displays a chunky linear progress bar with `value/total (progress %)`.
 * @param {{
  value: number,
  total: number,
  * }} props
 */
function LinearProgressWithLabel(props) {
  const classes = useStyles();
  const { value, total } = props;
  const progress = value / total * 100;
  return (
    <Box display="flex" alignItems="center" className={classes.root}>
      <Box width="100%" mr={1}>
        <BorderLinearProgress
          variant="determinate"
          {...props}
          value={progress}
          height={40}
        />
      </Box>
      <Box>
        <Typography variant="body2">
          {`${value}/${total}`}&nbsp;
          {`(${Math.round(progress)}%)`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
};

export default LinearProgressWithLabel;

