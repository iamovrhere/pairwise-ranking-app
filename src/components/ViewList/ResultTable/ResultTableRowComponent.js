import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox,
  TableCell,
  TableRow,
} from '@material-ui/core';
import {
  RowImage,
} from './ResultTable.style';


const ResultTableCellComponent = ({
  headCell,
  row,
  labelId,
  rank
}) => {
  const outRow = { ...row, rank };
  const { id, numeric } = headCell;
  const isName = id === 'name';
  const isImg = id === 'image';
  // We want name to be the field to grow.
  const width = isName ? null :
    (isImg ? 100 : 30);

  return (
    <TableCell
      align={numeric ? 'right' : 'left'}
      id={isName ? labelId : null}
      component={isName ? 'th' : null}
      scope={isName ? 'row' : null}
      width={width}
    >
      {
        isImg ?
          (outRow.image && <RowImage
            src={outRow.image}
            alt={outRow.name}
          />) :
          outRow[id]
      }
    </TableCell>
  );
};

ResultTableCellComponent.propTypes = {
  headCell: PropTypes.shape({
    id: PropTypes.string.isRequired,
    numeric: PropTypes.bool.isRequired,
    disablePadding: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  }),
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
  labelId: PropTypes.string.isRequired,
  rank: PropTypes.string.isRequired,
};

/**
 * Renders each row of the result table; deciding values and layout.
 *
 * @param {{
 *  headCells: [TableData],
 *  row: string,
 *  labelId: string,
 *  isItemSelected: boolean,
 *  handleClick: Function,
 *  rank: string,
 * }} props
 */
const ResultTableRowComponent = ({
  headCells,
  row,
  labelId,
  isItemSelected,
  handleClick,
  rank,
}) => {
  return (
    <TableRow
      hover
      onClick={(event) => handleClick(event, row.id)}
      role="checkbox"
      aria-checked={isItemSelected}
      tabIndex={-1}
      key={row.id}
      selected={isItemSelected}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={isItemSelected}
          inputProps={{ 'aria-labelledby': labelId }}
        />
      </TableCell>
      {headCells.map((headCell) => (
        <ResultTableCellComponent
          key={`${headCell.id}-${row.id}`}
          headCell={headCell}
          row={row}
          labelId={labelId}
          rank={rank}
        />
      ))}
    </TableRow>
  );
};

ResultTableRowComponent.propTypes = {
  headCells: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    numeric: PropTypes.bool.isRequired,
    disablePadding: PropTypes.bool.isRequired,
    label: PropTypes.string.isRequired,
  })),
  row: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  }),
  labelId: PropTypes.string.isRequired,
  isItemSelected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  rank: PropTypes.string.isRequired,
};

export default ResultTableRowComponent;
