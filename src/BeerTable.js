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
    console.log('calling constructor');
    this.state.columns = this.getColumnsState();
    this.state.displayData = this.computeDisplayData();
  }

  getColumnsState = () => {
    const propColumns = this.props.columns;
    const stateColumns = [];
    for (let pCol of propColumns) {
      stateColumns.push({
        key: pCol.id ? pCol.id : pCol.name,
        name: pCol.name,
        formatter: pCol.formatter || null,
        filterValue: pCol.filterValue || '',
        sort: pCol.sort || null,
        sortDirection: pCol.sortDirection || null,
        customMatch: pCol.customMatch || null,
      });
    }
    return stateColumns;
  };

  computeDisplayData = () => {
    const { data } = this.props;
    const { columns } = this.state;
    const filteredData = [];
    console.log('Computing Display data...');
    console.log(columns);
    for (let row of data) {
      this.shouldFilter(row, columns) ? null : filteredData.push(row);
    }
    console.log('Filtered data');
    console.log(filteredData);

    const columnToSort = columns.find(
      col => !(col.sortDirection === null || col.sortDirection === undefined),
    );

    console.log('Column to sort...');
    console.log(columnToSort);

    if (columnToSort) {
      let sortFunc;
      if (columnToSort.sort) {
        sortFunc = columnToSort.sort;
      } else if (columnToSort.sortDirection === 'asc') {
        sortFunc = _.defaultSort;
      } else {
        sortFunc = (a, b, direction) => -1 * _.defaultSort(a, b, direction);
      }

      return filteredData.sort(sortFunc);
    }
    return filteredData;
  };

  shouldFilter = (row, columns) => {
    const activeFilters = columns.filter(col => !_.isEmpty(col.filterValue));
    console.log(`num activeFilters: ${activeFilters.length}`);

    let match = false;
    for (let column of activeFilters) {
      console.log(`found acive filter for ${column.key}`);
      console.log(column);
      const { filterValue } = column;
      const columnValue = row[column.key];
      if (column.customMatch) {
        console.log('custom match found!');
        match = column.customMatch(columnValue, filterValue);
        console.log(`match?: ${match}`);
      } else {
        match =
          columnValue
            .toString()
            .toLowerCase()
            .indexOf(filterValue.toString().toLowerCase()) >= 0;
      }

      if (!match) {
        return true;
      }
    }
    return false;
  };

  handleFilterChange = (colKey, newValue) => {
    const { columns } = this.state;
    const column = columns.find(c => c.key === colKey);
    column.filterValue = newValue;
    this.setState({ columns, displayData: this.computeDisplayData() });
  };

  handleSortClick = () => {
    console.log('todo... handle sort click');
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
          <BeerHead columns={columns} onFilterUpdate={this.handleFilterChange} />
          {this.renderBody()}
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(BeerTable);
