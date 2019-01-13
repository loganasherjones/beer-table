import React from 'react';
import ReactDOM from 'react-dom';
import BeerTable from '../../src/';

class Example extends React.Component {
  render() {
    return <BeerTable text="text from server" />;
  }
}

ReactDOM.render(<Example />, document.getElementById('app-root'));
