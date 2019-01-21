import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TableCell,
  TextField,
  Tooltip,
  withStyles,
} from '@material-ui/core';
import moment from 'moment';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from 'material-ui-pickers';
import { ArrowDownward, ArrowDropDown, ArrowUpward, CalendarToday, Sort } from '@material-ui/icons';

import _ from '../utils';

const styles = theme => ({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  hidden: { display: 'none' },
  pointer: { cursor: 'pointer' },
  fakeSelect: {
    color: theme.palette.text.secondary,
  },
  header: {
    backgroundColor: theme.palette.background.paper,
    position: 'sticky',
    top: 0,
    zIndex: 10,
  },
});

class BeerHeadCell extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    column: PropTypes.object.isRequired,
    onFilterUpdate: PropTypes.func.isRequired,
    onSortUpdate: PropTypes.func.isRequired,
  };

  state = {
    anchorEl: null,
  };

  handleFilterChange = event => {
    this.props.onFilterUpdate(this.props.column, event.target.value);
  };

  handleSortClick = () => {
    const { column, onSortUpdate } = this.props;
    let direction;
    if (column.sortDirection === 'asc') {
      direction = 'desc';
    } else if (column.sortDirection === 'desc') {
      direction = 'asc';
    } else {
      direction = column.defaultSortDirection;
    }

    onSortUpdate(this.props.column, direction);
  };

  openMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleSelectClick = value => {
    this.props.onFilterUpdate(this.props.column, value);
    this.closeMenu();
  };

  handleDateChange = (date, type) => {
    const val = _.exists(date) ? parseInt(moment(date).format('x')) : '';
    const { column } = this.props;
    if (type === 'begin') {
      this.props.onFilterUpdate(column, [val, column.filterValue[1]]);
    } else {
      this.props.onFilterUpdate(column, [column.filterValue[0], val]);
    }
  };

  closeMenu = event => {
    this.setState({ anchorEl: null });
  };

  renderSortIcon = () => {
    const {
      column: { sortDirection, disableSort },
      classes,
    } = this.props;

    if (disableSort) {
      return null;
    }
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

  openPicker = (picker, e) => {
    picker.open(e);
  };

  renderDateTimeRange = () => {
    const {
      classes,
      column: { name, filterValue },
    } = this.props;
    return (
      <div className={classes.container}>
        <Tooltip disableFocusListener={true} placement="top" title="Begin Date">
          <IconButton
            aria-label={`Begin Date for ${name}`}
            onClick={e => this.openPicker(this.beginPicker, e)}>
            <CalendarToday fontSize="small" />
          </IconButton>
        </Tooltip>
        {name}
        <Tooltip disableFocusListener={true} placement="top" title="End Date">
          <IconButton
            aria-label={`End Date for ${name}`}
            onClick={e => this.openPicker(this.endPicker, e)}>
            <CalendarToday fontSize="small" />
          </IconButton>
        </Tooltip>
        {this.renderSortIcon()}
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker
            ref={node => {
              this.beginPicker = node;
            }}
            clearable
            value={filterValue[0]}
            onChange={date => this.handleDateChange(date, 'begin')}
            className={classes.hidden}
          />
          <DateTimePicker
            ref={node => {
              this.endPicker = node;
            }}
            clearable
            className={classes.hidden}
            value={filterValue[1]}
            onChange={date => this.handleDateChange(date, 'end')}
          />
        </MuiPickersUtilsProvider>
      </div>
    );
  };

  renderTextField = () => {
    const {
      column: { key, name, disableFilter, filterValue, disableSort },
    } = this.props;
    let inputProps;
    if (!disableSort) {
      inputProps = {
        endAdornment: <InputAdornment position="end">{this.renderSortIcon()}</InputAdornment>,
      };
    }
    return (
      <TextField
        id={key}
        name={name}
        label={name}
        onChange={this.handleFilterChange}
        value={filterValue}
        disabled={disableFilter}
        InputProps={inputProps}
      />
    );
  };

  renderSelectField = () => {
    const {
      classes,
      column: { key, disableFilter, name, filterValue, filterEnum },
    } = this.props;
    const { anchorEl } = this.state;
    const menuItems = [
      <MenuItem key={0} value="" onClick={() => this.handleSelectClick('')}>
        <em>None</em>
      </MenuItem>,
    ];
    filterEnum.map((val, index) => {
      menuItems.push(
        <MenuItem key={index + 1} value={val} onClick={() => this.handleSelectClick(val)}>
          {val}
        </MenuItem>,
      );
    });
    const menuId = `col-menu-${key}`;

    return (
      <div className={classes.container}>
        <Button
          disabled={disableFilter}
          className={classes.fakeSelect}
          aria-owns={anchorEl ? menuId : undefined}
          aria-haspopup="true"
          onClick={this.openMenu}>
          {filterValue ? filterValue : name}
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
    const { column, classes } = this.props;
    let header;
    if (!_.isEmpty(column.filterEnum)) {
      header = this.renderSelectField();
    } else if (column.datetime) {
      header = this.renderDateTimeRange();
    } else {
      header = this.renderTextField();
    }
    return (
      <TableCell className={classes.header} key={column.key}>
        {header}
      </TableCell>
    );
  }
}

export default withStyles(styles)(BeerHeadCell);
