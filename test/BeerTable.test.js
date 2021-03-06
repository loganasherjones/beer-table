import React from 'react';
import { shallow } from 'enzyme';

import moment from 'moment';
import { defaultColumns, defaultData, defaultPagination } from './utils';
import BeerBody from '../src/components/BeerBody';
import BeerFooter from '../src/components/BeerFooter';
import BeerHead from '../src/components/BeerHead';
import BeerTable from '../src/index';

const setup = overrideProps => {
  const props = Object.assign(
    {
      columns: defaultColumns,
      data: defaultData,
      dataLength: defaultData.length,
      filterCount: defaultData.length,
      pagination: defaultPagination,
    },
    overrideProps,
  );
  const wrapper = shallow(<BeerTable {...props} />);
  return {
    wrapper,
    table: wrapper.dive(),
    props,
  };
};

describe('<BeerTable />', () => {
  it('renders a header body and footer', () => {
    const { table } = setup();
    expect(table.find(BeerHead)).toHaveLength(1);
    expect(table.find(BeerBody)).toHaveLength(1);
    expect(table.find(BeerFooter)).toHaveLength(1);
  });

  describe('filtering', () => {
    it('should do exact filtering', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].filterValue = 'echo';
      const { table } = setup({ columns });
      const data = table.find(BeerBody).prop('displayData');
      expect(data.length).toEqual(3);
    });

    it('should do partial matching', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].filterValue = 'c';
      const { table } = setup({ columns });
      const data = table.find(BeerBody).prop('displayData');
      expect(data.length).toEqual(4);
    });

    it('should handle multiple filters with and logic', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].filterValue = 'c';
      columns[1].filterValue = 'sleep';
      const { table } = setup({ columns });
      const data = table.find(BeerBody).prop('displayData');
      expect(data.length).toEqual(1);
    });

    it('should respect custom filtering functions', () => {
      const neverMatch = (columnVal, filterVal) => {
        return false;
      };
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].filterValue = 'echo';
      columns[0].customMatch = neverMatch;
      const { table } = setup({ columns });
      const data = table.find(BeerBody).prop('displayData');
      expect(data.length).toEqual(0);
    });

    it('should match datetimes', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[4].filterValue = [moment(0).format('x'), ''];
      const { table } = setup({ columns });
      const data = table.find(BeerBody).prop('displayData');
      expect(data.length).toEqual(5);
    });
  });

  describe('sorting', () => {
    it('should sort ascending correctly', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].sortDirection = 'asc';
      const { table } = setup({ columns });
      const systems = table
        .find(BeerBody)
        .prop('displayData')
        .map(d => d.system);
      expect(systems).toEqual(['complex', 'echo', 'echo', 'echo', 'error', 'sleeper']);
    });

    it('should sort descending correctly', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].sortDirection = 'desc';
      const { table } = setup({ columns });
      const systems = table
        .find(BeerBody)
        .prop('displayData')
        .map(d => d.system);
      expect(systems).toEqual(['sleeper', 'error', 'echo', 'echo', 'echo', 'complex']);
    });

    it('should allow custom sorting', () => {
      const eGoesFirst = (name, direction) => {
        return function(a, b) {
          a = a[name];
          b = b[name];
          if (a.startsWith('e') && b.startsWith('e')) {
            return 0;
          } else if (a.startsWith('e')) {
            return -1;
          } else if (b.startsWith('e')) {
            return 1;
          }
          return 0;
        };
      };

      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].sortDirection = 'desc';
      columns[0].customSort = eGoesFirst;
      const { table } = setup({ columns });
      const systems = table
        .find(BeerBody)
        .prop('displayData')
        .map(d => d.system);
      expect(systems).toEqual(['echo', 'error', 'echo', 'echo', 'complex', 'sleeper']);
    });
  });

  describe('pagination', () => {
    it('should only render the correct rows per page', () => {
      const pagination = JSON.parse(JSON.stringify(defaultPagination));
      pagination.rowsPerPage = 2;
      const { table } = setup({ pagination });
      const data = table.find(BeerBody).prop('displayData');
      expect(data.length).toEqual(2);
    });
  });

  describe('actions', () => {
    it('should update filter and display data on filter change', () => {
      const systemColumn = JSON.parse(JSON.stringify(defaultColumns))[0];
      const { table } = setup();
      table.instance().handleFilterChange(systemColumn, 'complex');
      table.update();
      expect(table.state('displayData').length).toEqual(1);
      expect(table.state('columns')[0].filterValue).toEqual('complex');
    });

    it('should update sorting information on sort update', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[1].sortDirection = 'asc';
      const { table } = setup({ columns });
      table.instance().handleSortUpdate(columns[0], 'asc');
      table.update();
      expect(table.state('columns')[0].sortDirection).toEqual('asc');
      expect(table.state('columns')[1].sortDirection).toEqual(null);
    });

    it('should update pagination information on page change', () => {
      const { table } = setup();
      table.instance().handleChangePage(null, 1);
      table.update();
      expect(table.state('pagination').currentPageNum).toEqual(1);
    });

    it('should update pagination information on change rows per page', () => {
      const { table } = setup();
      table.instance().handleChangeRowsPerPage({ target: { value: 3 } });
      table.update();
      expect(table.state('pagination').rowsPerPage).toEqual(3);
      expect(table.state('displayData').length).toEqual(3);
    });
  });
});
