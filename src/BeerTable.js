import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, Paper, Table, TableCell, TableBody, TableRow } from '@material-ui/core';
import _ from './utils';
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
    columns: PropTypes.array.isRequired,
    data: PropTypes.array.isRequired,
    classes: PropTypes.object.isRequired,
  };

  state = {
    columns: [],
    displayData: [],
  };

  constructor(props) {
    super(props);
    this.state.columns = this.constructColumnsState();
    this.state.displayData = this.computeDisplayData();
  }

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
        defaultSortDirection: pCol.defaultSortDirection || 'desc',
        customMatch: pCol.customMatch || null,
        filterEnum: pCol.filterEnum || null,
        disableFilter: pCol.disableFilter || false,
        datetime: pCol.datetime || false,
      });
    }
    return stateColumns;
  };

  computeDisplayData = () => {
    const { data } = this.props;
    const { columns } = this.state;
    const filteredData = [];

    for (let row of data) {
      this.shouldFilter(row, columns) ? null : filteredData.push(row);
    }

    const columnToSort = columns.find(
      col => !(col.sortDirection === null || col.sortDirection === undefined),
    );

    if (columnToSort) {
      let sortFunc;
      if (columnToSort.sort) {
        sortFunc = columnToSort.customSort(columnToSort.key, columnToSort.sortDirection);
      } else {
        sortFunc = _.defaultSort(columnToSort.key, columnToSort.sortDirection);
      }

      filteredData.sort(sortFunc);
    }
    return filteredData;
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
    this.setState({ columns, displayData: this.computeDisplayData() });
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

    this.setState({ columns, displayData: this.computeDisplayData() });
  };

  getColDisplayValue = (col, row) => {
    const accessor = col.id ? col.id : col.name;
    const rawValue = row[accessor];
    if (col.formatter) {
      return col.formatter(rawValue);
    } else {
      return rawValue;
    }
  };

  renderDataRow = row => {
    const { columns } = this.props;
    return columns.map(col => {
      const displayValue = this.getColDisplayValue(col, row);
      return <TableCell key={col.name}>{displayValue}</TableCell>;
    });
  };

  renderBody = () => {
    const { displayData } = this.state;
    return (
      <TableBody>
        {displayData.map((row, index) => {
          let id;
          if (row.id === null || row.id === undefined) {
            id = index;
          } else {
            id = row.id;
          }
          return <TableRow key={id}>{this.renderDataRow(row)}</TableRow>;
        })}
      </TableBody>
    );
  };

  render() {
    const { classes } = this.props;
    const { columns } = this.state;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <BeerHead
            columns={columns}
            onFilterUpdate={this.handleFilterChange}
            onSortUpdate={this.handleSortUpdate}
          />
          {this.renderBody()}
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(BeerTable);
