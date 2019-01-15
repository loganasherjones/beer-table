import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  InputAdornment,
  Menu,
  MenuItem,
  TableCell,
  TextField,
  withStyles,
} from '@material-ui/core';
import { ArrowDropDown, Sort, ArrowDownward, ArrowUpward } from '@material-ui/icons';

import _ from '../utils';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  pointer: { cursor: 'pointer' },
  fakeSelect: {
    color: theme.palette.text.secondary,
  },
});

class BeerHeadCell extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    column: PropTypes.object.isRequired,
    onFilterUpdate: PropTypes.func.isRequired,
    sortDirection: PropTypes.string,
    filterValue: PropTypes.string,
  };

  state = {
    anchorEl: null,
  };

  handleFilterChange = event => {
    this.props.onFilterUpdate(this.props.column.key, event.target.value);
  };

  handleSortClick = event => {
    console.log('TODO: Handle sort click for col:');
    console.log(this.props.column.key);
  };

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleSelectClick = value => {
    this.props.onFilterUpdate(this.props.column.key, value);
    this.closeMenu();
  };

  closeMenu = event => {
    this.setState({ anchorEl: null });
  };

  renderSortIcon = () => {
    const { sortDirection, classes } = this.props;
    const sortActive = sortDirection !== null && sortDirection !== undefined;
    const iconProps = {
      className: classes.pointer,
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

  renderTextField = () => {
    const { column, filterValue } = this.props;
    return (
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
    );
  };

  renderSelectField = () => {
    const { classes, column, filterValue } = this.props;
    const { anchorEl } = this.state;
    const menuItems = [
      <MenuItem key={0} value="" onClick={() => this.handleSelectClick('')}>
        <em>None</em>
      </MenuItem>,
    ];
    column.filterEnum.map((val, index) => {
      menuItems.push(
        <MenuItem key={index + 1} value={val} onClick={() => this.handleSelectClick(val)}>
          {val}
        </MenuItem>,
      );
    });
    const menuId = `col-menu-${column.key}`;

    return (
      <div className={classes.container}>
        <Button
          className={classes.fakeSelect}
          aria-owns={anchorEl ? menuId : undefined}
          aria-haspopup="true"
          onClick={this.openMenu}>
          {filterValue ? filterValue : column.name}
          <ArrowDropDown />
        </Button>
        {this.renderSortIcon()}
        <Menu id={menuId} anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.closeMenu}>
          {menuItems}
        </Menu>
      </div>
    );
  };

  render() {
    const { column } = this.props;
    let header;
    if (_.isEmpty(column.filterEnum)) {
      header = this.renderTextField();
    } else {
      header = this.renderSelectField();
    }
    return <TableCell key={column.key}>{header}</TableCell>;
  }
}

export default withStyles(styles)(BeerHeadCell);
