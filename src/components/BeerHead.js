import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableHead, TableRow } from '@material-ui/core';
import BeerHeadCell from './BeerHeadCell';

class BeerHead extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    onFilterUpdate: PropTypes.func.isRequired,
    onSortUpdate: PropTypes.func.isRequired,
  };

  render() {
    const { columns, onFilterUpdate, onSortUpdate } = this.props;
    return (
      <TableHead>
        <TableRow>
          {columns.map(col => {
            return (
              <BeerHeadCell
                key={col.key}
                column={col}
                onFilterUpdate={onFilterUpdate}
                onSortUpdate={onSortUpdate}
              />
            );
          })}
        </TableRow>
      </TableHead>
    );
  }
}

export default BeerHead;
