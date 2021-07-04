/**
 * Modified from: https://material-ui.com/components/tables/#sorting-amp-selecting
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
} from '@material-ui/core';

/**
 *
 * @param {{
    headCells: [TableData]
    classes: object
    onSelectAllClick: Function,
    order: string,
    orderBy: string,
    numSelected: number,
    rowCount: number
    onRequestSort: Function
  }} props
 */
const EnhancedTableHead = (props) => {
  const {
    headCells,
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all items' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {
              headCell.sortable ?
                (<TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                  ) : null}
                </TableSortLabel>) :
                headCell.label
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

EnhancedTableHead.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    numeric: PropTypes.bool.isRequired,
    disablePadding: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
    sortable: PropTypes.bool.isRequired,
  })),
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default EnhancedTableHead;
