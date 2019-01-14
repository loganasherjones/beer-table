import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow } from '@material-ui/core';
import BeerHeadCell from './BeerHeadCell';

class BeerHead extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    onFilterUpdate: PropTypes.func.isRequired,
  };

  render() {
    const { columns, onFilterUpdate } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map(col => {
            return (
              <BeerHeadCell
                key={col.key}
                column={col}
                sortDirection={col.sortDirection}
                filterValue={col.filterValue}
                onFilterUpdate={onFilterUpdate}
              />
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default BeerHead;