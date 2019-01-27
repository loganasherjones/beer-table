import React from 'react';
import moment from 'moment';
import BeerTable from '../../src/';
import ExampleService from './server';
import BIG_DATA from '../data';

const service = new ExampleService(BIG_DATA);

class ServerExample extends React.Component {
  state = {
    loading: true,
    data: [],
    error: null,
  };

  formatDate = value => {
    return moment(value).format('MMMM Do YYYY, h:mm:ss a');
  };

  componentDidMount() {
    this.setState({ loading: true });
    service.getData().then(res => {
      this.setState({ data: res, loading: false });
    });
  }

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
    const { data, loading } = this.state;
    return (
      <div style={{ display: 'flex', maxHeight: '800px' }}>
        <BeerTable data={data} columns={columns} loading={loading} />
      </div>
    );
  }
}

export default ServerExample;
