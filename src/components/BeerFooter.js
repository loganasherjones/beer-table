import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  footer: {
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    bottom: 0,
    zIndex: 10,
  },
});

class BeerFooter extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    colSpan: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func.isRequired,
    totalCount: PropTypes.number.isRequired,
    pagination: PropTypes.object.isRequired,
  };

  displayPaginationInfo = ({ from, to, count }) => {
    const { totalCount } = this.props;
    if (totalCount === count) {
      return `${from}-${to} of ${count}`;
    } else {
      const filterCount = totalCount - count;
      return `${from}-${to} of ${count} (${filterCount} results filtered)`;
    }
  };

  render() {
    const { onChangePage, onChangeRowsPerPage, classes, pagination, colSpan, count } = this.props;
    return (
      <TableFooter>
        <TableRow>
          <TablePagination
            className={classes.footer}
            rowsPerPageOptions={pagination.rowsPerPageOptions}
            colSpan={colSpan}
            count={count}
            rowsPerPage={pagination.rowsPerPage}
            page={pagination.currentPageNum}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            labelDisplayedRows={this.displayPaginationInfo}
          />
        </TableRow>
      </TableFooter>
    );
  }
}

export default withStyles(styles)(BeerFooter);
