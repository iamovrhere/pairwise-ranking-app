/**
 * Modified from: https://material-ui.com/components/tables/#sorting-amp-selecting
 */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  IconButton,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from '@material-ui/core';
import {
  ImportExport as ImportExportIcon,
  Delete as DeleteIcon,
  Done as DoneIcon,
  Edit as EditIcon,
} from '@material-ui/icons';
import { lighten, makeStyles } from '@material-ui/core/styles';

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight: {
    borderRadius: '1rem',
    color: theme.palette.secondary.main,
    backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
    flexDirection: 'column'
  },
  input: {
    margin: '0 1rem'
  }
}));

/**
 * Creates title of the table OR the toolbar when in select mode.
 *
 * @param {{
  *  numSelected: number,
  *  title: string,
  *  rankRange: {start, end},
  *  onRankRangeChange: Function,
  *  onExportRows: Function,
  *  onClearRows: Function,
  * }} props
  */
const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const {
    title,
    numSelected,
    rankRange,
    onRankRangeChange,
    onExportRows,
    onClearRows
  } = props;

  const editButtonText = "Edit Ranges";
  const doneButtonText = "Done";

  const isSelectMode = numSelected > 0;
  const [isEditMode, setIsEditMode] = React.useState(false);

  /**
   * Creates a lambda for the onChange event.
   * Includes safety for preventing letter inputs
   * (firefox will set the value as blank even with type number).
   *
   * @param {{start: boolean, end: boolean}} param0
   */
  const createChangeHandler = ({ start, end }) => (event) => {
    const value = event.target.value
    if (isNaN(value) || value === "") {
      return;
    }
    onRankRangeChange({
      start: Number(start === true ? value : rankRange.start),
      end: Number(end === true ? value : rankRange.end),
    });
  };

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: isSelectMode,
      })}
    >
      {isSelectMode ? (
        <>
          <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
            {numSelected} selected
          </Typography>
          <Tooltip title="Export rows">
            <IconButton aria-label="Export rows" onClick={onExportRows}>
              <ImportExportIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Clear rows">
            <IconButton aria-label="Clear rows" onClick={onClearRows}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
          isEditMode ? (
            <>
              <div className={classes.title}>
                <TextField
                  id="start-range"
                  className={classes.input}
                  label="Rank Start"
                  type="number"
                  defaultValue={rankRange.start}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={createChangeHandler({ start: true })}
                />
                <TextField
                  id="end-range"
                  className={classes.input}
                  label="Rank End"
                  type="number"
                  defaultValue={rankRange.end}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={createChangeHandler({ end: true })}
                />
              </div>
              <Tooltip title={doneButtonText}>
                <IconButton
                  aria-label={doneButtonText}
                  onClick={() => setIsEditMode(false)}
                >
                  <DoneIcon />
                </IconButton>
              </Tooltip>
            </>
          ) :
            (
              <>
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                  {title}
                </Typography>
                <Tooltip title={editButtonText}>
                  <IconButton
                    aria-label={editButtonText}
                    onClick={() => setIsEditMode(true)}
                  >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </>
            )
        )
      }
    </Toolbar >
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  rankRange: PropTypes.shape({
    start: PropTypes.number.isRequired,
    end: PropTypes.number.isRequired
  }),
  onRankRangeChange: PropTypes.func.isRequired,
  onExportRows: PropTypes.func.isRequired,
  onClearRows: PropTypes.func.isRequired
};

export default EnhancedTableToolbar;
