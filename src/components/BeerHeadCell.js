import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TableCell, TextField, InputAdornment } from '@material-ui/core';
import { Sort, ArrowDownward, ArrowUpward } from '@material-ui/icons';

class BeerHeadCell extends Component {
  static propTypes = {
    column: PropTypes.object.isRequired,
    onFilterUpdate: PropTypes.func.isRequired,
    sortDirection: PropTypes.string,
    filterValue: PropTypes.string,
  };

  handleFilterChange = event => {
    console.log('HANDLING FLITER CHANGE');
    this.props.onFilterUpdate(this.props.column.key, event.target.value);
  };

  handleSortClick = event => {
    console.log('TODO: Handle sort click for col:');
    console.log(this.props.column.key);
  };

  renderSortIcon = () => {
    const { sortDirection } = this.props;
    const sortActive = sortDirection !== null && sortDirection !== undefined;
    const iconProps = {
      style: { cursor: 'pointer' },
      fontSize: 'small',
      onClick: this.handleSortClick,
    };

    if (!sortActive) {
      return <Sort {...iconProps} />;
    } else if (sortDirection === 'asc') {
      return <ArrowUpward {...iconProps} />;
    } else {
      return <ArrowDownward {...iconProps} />;
    }
  };

  render() {
    const { column, filterValue } = this.props;
    return (
      <TableCell key={column.key}>
        <TextField
          id={column.key}
          name={column.name}
          label={column.name}
          onChange={this.handleFilterChange}
          value={filterValue}
          InputProps={{
            endAdornment: <InputAdornment position="end">{this.renderSortIcon()}</InputAdornment>,
          }}
        />
      </TableCell>
    );
  }
}

export default BeerHeadCell;
