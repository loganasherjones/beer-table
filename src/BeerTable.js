import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Table, TableCell, TableBody, TableRow } from '@material-ui/core';
import _ from './utils';
import BeerBody from './components/BeerBody';
import BeerFooter from './components/BeerFooter';
import BeerHead from './components/BeerHead';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  pointer: {
    cursor: 'pointer',
  },
});

class BeerTable extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    filterCount: PropTypes.number,
    pagination: PropTypes.object,
    totalCount: PropTypes.number,
  };

  state = {
    columns: [],
    displayData: [],
    filterCount: null,
    totalCount: null,
    pagination: {},
  };

  constructor(props) {
    super(props);
    this.state.columns = this.constructColumnsState();
    this.state.pagination = this.constructPaginationState();
    const { displayData, filterCount, totalCount } = this.computeDisplayState();
    this.state.displayData = displayData;
    this.state.filterCount = filterCount;
    this.state.totalCount = totalCount;
  }

  constructPaginationState = () => {
    return Object.assign(
      {
        currentPageNum: 0,
        rowsPerPageOptions: [10, 25, 50, 100],
        rowsPerPage: 10,
      },
      this.props.pagination,
    );
  };
  constructColumnsState = () => {
    const propColumns = this.props.columns;
    const stateColumns = [];
    for (let pCol of propColumns) {
      let defaultFilterVal;
      if (pCol.datetime) {
        defaultFilterVal = ['', ''];
      } else {
        defaultFilterVal = '';
      }
      stateColumns.push({
        key: pCol.id ? pCol.id : pCol.name,
        name: pCol.name,
        formatter: pCol.formatter || null,
        filterValue: pCol.filterValue || defaultFilterVal,
        sort: pCol.sort || null,
        sortDirection: pCol.sortDirection || null,
        disableSort: pCol.disableSort || false,
        defaultSortDirection: pCol.defaultSortDirection || 'desc',
        customMatch: pCol.customMatch || null,
        filterEnum: pCol.filterEnum || null,
        disableFilter: pCol.disableFilter || false,
        datetime: pCol.datetime || false,
      });
    }
    return stateColumns;
  };

  computeDisplayState = () => {
    const { data } = this.props;
    const { columns, pagination } = this.state;
    const filteredData = [];

    const totalCount = _.exists(this.props.totalCount) ? this.props.totalCount : data.length;

    for (let row of data) {
      this.shouldFilter(row, columns) ? null : filteredData.push(row);
    }

    const columnToSort = columns.find(col => _.exists(col.sortDirection));

    if (columnToSort) {
      let sortFunc;
      if (columnToSort.sort) {
        sortFunc = columnToSort.customSort(columnToSort.key, columnToSort.sortDirection);
      } else {
        sortFunc = _.defaultSort(columnToSort.key, columnToSort.sortDirection);
      }

      filteredData.sort(sortFunc);
    }

    const filterCount = _.exists(this.props.filterCount)
      ? this.props.filterCount
      : filteredData.length;
    const beginIndex = Math.max(pagination.currentPageNum * pagination.rowsPerPage - 1, 0);
    const endIndex = Math.min(beginIndex + pagination.rowsPerPage, data.length);
    return {
      displayData: filteredData.slice(beginIndex, endIndex),
      filterCount,
      totalCount,
    };
  };

  shouldFilter = (row, columns) => {
    let match = false;
    for (let column of columns) {
      if (column.datetime && column.filterValue[0] === '' && column.filterValue[1] === '') {
        continue;
      } else if (_.isEmpty(column.filterValue)) {
        continue;
      }

      const { filterValue } = column;
      const columnValue = row[column.key];
      if (column.customMatch) {
        match = column.customMatch(columnValue, filterValue);
      } else if (column.datetime) {
        match = _.datetimeMatch(columnValue, filterValue[0], filterValue[1]);
      } else {
        match = _.defaultMatch(columnValue, filterValue);
      }

      if (!match) {
        return true;
      }
    }

    return false;
  };

  handleFilterChange = (propColumn, newValue) => {
    const { columns } = this.state;
    const column = columns.find(c => c.key === propColumn.key);
    column.filterValue = newValue;
    const state = this.computeDisplayState();
    this.setState({ columns, ...state });
  };

  handleSortUpdate = (columnToSort, direction) => {
    const { columns } = this.state;
    for (let column of columns) {
      if (column.key === columnToSort.key) {
        column.sortDirection = direction;
      } else {
        column.sortDirection = null;
      }
    }

    const state = this.computeDisplayState();
    this.setState({ columns, ...state });
  };

  handleChangePage = (event, newPage) => {
    const { pagination } = this.state;
    pagination.currentPageNum = newPage;
    const state = this.computeDisplayState();
    this.setState({ pagination, ...state });
  };

  handleChangeRowsPerPage = event => {
    const { pagination } = this.state;
    pagination.rowsPerPage = event.target.value;
    const state = this.computeDisplayState();
    this.setState({ pagination, ...state });
  };

  render() {
    const { classes } = this.props;
    const { totalCount, columns, pagination, filterCount, displayData } = this.state;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <BeerHead
            columns={columns}
            onFilterUpdate={this.handleFilterChange}
            onSortUpdate={this.handleSortUpdate}
          />
          <BeerBody columns={columns} displayData={displayData} />
          <BeerFooter
            colSpan={columns.length}
            count={filterCount}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
            totalCount={totalCount}
            pagination={pagination}
          />
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(BeerTable);
