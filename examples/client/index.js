import React from 'react';
import moment from 'moment';
import BeerTable from '../../src/';
import DATA from '../data';

class ClientExample extends React.Component {
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
      {
        name: 'Created At',
        id: 'createdAt',
        formatter: this.formatDate,
        datetime: true,
        sortDirection: 'desc',
      },
      { name: 'Comment', id: 'comment', disableFilter: true, disableSort: true },
    ];
    return (
      <div style={{ display: 'flex', maxHeight: '800px' }}>
        <BeerTable data={DATA} columns={columns} />
      </div>
    );
  }
}

export default ClientExample;
