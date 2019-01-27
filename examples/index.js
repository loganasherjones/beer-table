import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import ClientExample from './client';
import ServerExample from './server';

class Root extends Component {
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
    currentTable: 'client',
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

  handleTableChange = event => {
    this.setState({ currentTable: event.target.value });
  };

  renderToggleButtons = () => {
    const { currentTheme, currentTable } = this.state;
    const isChecked = currentTheme === 'dark';
    return (
      <Paper style={{ marginBottom: '10px', display: 'flex', flexDirection: 'row' }}>
        <FormControlLabel
          control={<Switch checked={isChecked} onChange={this.toggleTheme} />}
          label="Toggle Theme"
        />
        <FormControl component="fieldset">
          <FormLabel component="legend">Table Type</FormLabel>
          <RadioGroup
            aria-label="Table Type"
            name="tableType"
            value={currentTable}
            onChange={this.handleTableChange}>
            <FormControlLabel control={<Radio />} label="All Client-Side" value="client" />
            <FormControlLabel control={<Radio />} label="Server Initial Load" value="mixed" />
          </RadioGroup>
        </FormControl>
      </Paper>
    );
  };

  render() {
    const { currentTheme, currentTable } = this.state;
    const theme = currentTheme === 'light' ? this.lightTheme : this.darkTheme;
    const example = currentTable === 'client' ? <ClientExample /> : <ServerExample />;

    return (
      <MuiThemeProvider theme={theme}>
        {this.renderToggleButtons()}
        {example}
      </MuiThemeProvider>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('app-root'));
