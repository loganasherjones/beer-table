import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import _ from '../utils';

class BeerBody extends Component {
  static propTypes = {
    columns: PropTypes.array.isRequired,
    displayData: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired,
  };

  renderMissingData = () => {
    const { columns } = this.props;
    const activeFilters = columns.reduce((total, col) => {
      if (_.isEmptyFilter(col.filterValue)) {
        return total;
      } else {
        return total + 1;
      }
    }, 0);

    let additionalInfo = null;
    if (activeFilters > 0) {
      additionalInfo = (
        <>
          <Typography color="textSecondary" variant="subtitle1">
            Number of active filters: {activeFilters}
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            You could try removing the filters to see the data again.
          </Typography>
        </>
      );
    }

    return (
      <TableRow>
        <TableCell colSpan={columns.length} align="center">
          <Typography color="textPrimary" variant="h5" style={{ marginTop: '10px' }}>
            Hmmm...
          </Typography>
          <Typography color="textSecondary" variant="subtitle1">
            There doesnt seem to be any data.
          </Typography>
          {additionalInfo}
        </TableCell>
      </TableRow>
    );
  };

  getColDisplayValue = (col, row) => {
    const rawValue = row[col.key];
    if (_.exists(col.formatter)) {
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

  renderData = () => {
    const { displayData } = this.props;
    return displayData.map((row, index) => {
      const id = _.exists(row.id) ? row.id : index;
      return <TableRow key={id}>{this.renderDataRow(row)}</TableRow>;
    });
  };

  renderSpinner = () => {
    const { columns } = this.props;
    return (
      <TableRow>
        <TableCell colSpan={columns.length} align="center">
          <CircularProgress size={70} />
        </TableCell>
      </TableRow>
    );
  };

  render() {
    const { displayData, loading } = this.props;
    let cell;
    if (loading) {
      cell = this.renderSpinner();
    } else if (_.isEmpty(displayData)) {
      cell = this.renderMissingData();
    } else {
      cell = this.renderData();
    }
    return <TableBody>{cell}</TableBody>;
  }
}

export default BeerBody;
