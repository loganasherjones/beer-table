import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import BeerTable from '../../src/';
import DATA, { BIG_DATA } from './data';
import { MuiThemeProvider, createMuiTheme, Paper, Switch, Typography } from '@material-ui/core';

class Example extends React.Component {
  formatDate = value => {
    return moment(value).format('MMMM Do YYYY, h:mm:ss a');
  };

  render() {
    const columns = [
      { name: 'System', id: 'system' },
      { name: 'Command', id: 'command' },
      { name: 'System Version', id: 'systemVersion' },
      {
        name: 'Status',
        id: 'status',
        filterEnum: ['CREATED', 'RECEIVED', 'IN_PROGRESS', 'SUCCESS', 'ERROR'],
      },
      { name: 'Created At', id: 'createdAt', formatter: this.formatDate, datetime: true },
      { name: 'Comment', id: 'comment', disableFilter: true },
    ];
    return <BeerTable data={DATA} columns={columns} />;
  }
}

class Root extends React.Component {
  lightTheme = createMuiTheme({
    typography: { useNextVariants: true },
    palette: { type: 'light' },
  });
  darkTheme = createMuiTheme({
    typography: { useNextVariants: true },
    palette: { type: 'dark' },
  });

  state = {
    currentTheme: 'light',
  };

  toggleTheme = () => {
    let newTheme;
    if (this.state.currentTheme === 'light') {
      newTheme = 'dark';
    } else {
      newTheme = 'light';
    }
    this.setState({ currentTheme: newTheme });
  };

  renderToggleButton = () => {
    const { currentTheme } = this.state;
    const isChecked = currentTheme === 'dark';
    return (
      <Paper style={{ marginBottom: '10px' }}>
        <Switch value="checked" checked={isChecked} onChange={this.toggleTheme} />
        <Typography variant="body1">Toggle Theme</Typography>
      </Paper>
    );
  };

  render() {
    let theme;
    if (this.state.currentTheme === 'light') {
      theme = this.lightTheme;
    } else {
      theme = this.darkTheme;
    }
    return (
      <MuiThemeProvider theme={theme}>
        {this.renderToggleButton()}
        <Example />
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('app-root'));
