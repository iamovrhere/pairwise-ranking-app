/**
 * Modified from: https://material-ui.com/components/tables/#sorting-amp-selecting
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
} from '@material-ui/core';
import EnhancedTableHead from './EnhancedTableHeadComponent';
import EnhancedTableToolbar from './EnhancedTableToolbarComponent';
import ResultTableRow from './ResultTableRowComponent';
import {
  useStyles,
} from './ResultTable.style';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

/**
 * Expected structure of the table data.
 * @typedef {{
  * id: string,
  * rank: number,
  * name: string,
  * image: string,
  * score: number }} TableData
  */

/**
 * Helps define data structure.
 *
 * @param {string} name
 * @param {string} image
 * @param {number} score
 * @param {string} id Will be used later when actions are added.
 * @return {TableData}
 */
export function createRowData(name, image, score, id = '') {
  return { id, name, image, score };
}

/**
 * Correlates to `createRowData()`.
 * Ranks is calculated later.
 */
const headCells = [
  { id: 'score', numeric: true, disablePadding: true, label: 'Score', sortable: true },
  { id: 'image', numeric: false, disablePadding: false, label: 'Image', sortable: false },
  { id: 'name', numeric: false, disablePadding: true, label: 'Name', sortable: true },
  { id: 'rank', numeric: true, disablePadding: false, label: 'Rank', sortable: false },
];

const rowsPerPageOptions = [10, 25, 100, 1000];
const defaultRowsPerPage = 100;

/**
 * Creates the enhanced table with sortable headers, defined order,
 * and selectable rows.
 *
 * @param {{
 *  title: string,
 *  headCells: [TableData],
 *  defaultOrder: string,
 *  defaultOrderBy: string,
 *  maxScore: number
 * }} props
 */
export default function EnhancedTable(props) {
  const {
    title,
    rows,
    defaultOrderBy,
    defaultOrder,
    maxScore
  } = props;
  const classes = useStyles();
  const [order, setOrder] = React.useState(defaultOrder);
  const [orderBy, setOrderBy] = React.useState(defaultOrderBy);
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(defaultRowsPerPage);
  const [rankStart, setRankStart] = React.useState(1);
  const [rankEnd, setRankEnd] = React.useState(10);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          title={title}
          numSelected={selected.length}
          rankRange={{ start: rankStart, end: rankEnd }}
          onRankRangeChange={({ start, end }) => {
            setRankStart(start);
            setRankEnd(end);
          }}
        />
        <TableContainer className={classes.container}>
          <Table
            stickyHeader
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              headCells={headCells}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <ResultTableRow
                      key={labelId}
                      headCells={headCells}
                      row={row}
                      labelId={labelId}
                      isItemSelected={isItemSelected}
                      handleClick={handleClick}
                      maxScore={maxScore}
                      rankRange={{ start: rankStart, end: rankEnd }}
                    />
                  );
                })}

            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={rowsPerPageOptions}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>

    </div >
  );
}

EnhancedTable.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })),
  maxScore: PropTypes.number.isRequired,
  defaultOrder: PropTypes.oneOf(['asc', 'desc']).isRequired,
  defaultOrderBy: PropTypes.oneOf([
    'name', 'score'
  ]).isRequired,
  title: PropTypes.string.isRequired,
};
