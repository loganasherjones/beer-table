import React from 'react';
import { shallow } from 'enzyme';

import moment from 'moment';
import { defaultColumns, defaultData } from './utils';
import { TableBody, TableRow } from '@material-ui/core';
import BeerHead from '../src/components/BeerHead';
import BeerTable from '../src/index';

const setup = overrideProps => {
  const props = Object.assign(
    {
      columns: defaultColumns,
      data: defaultData,
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
  it('renders a header and body', () => {
    const { table } = setup();
    expect(table.find(BeerHead)).toHaveLength(1);
    expect(table.find(TableBody)).toHaveLength(1);
  });

  describe('filtering', () => {
    it('should do exact filtering', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].filterValue = 'echo';
      const { table } = setup({ columns });
      const body = table.find(TableBody);
      expect(body.find(TableRow)).toHaveLength(3);
    });

    it('should do partial matching', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].filterValue = 'c';
      const { table } = setup({ columns });
      const body = table.find(TableBody);
      expect(body.find(TableRow)).toHaveLength(4);
    });

    it('should handle multiple filters with and logic', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].filterValue = 'c';
      columns[1].filterValue = 'sleep';
      const { table } = setup({ columns });
      const body = table.find(TableBody);
      expect(body.find(TableRow)).toHaveLength(1);
    });

    it('should respect custom filtering functions', () => {
      const neverMatch = (columnVal, filterVal) => {
        return false;
      };
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].filterValue = 'echo';
      columns[0].customMatch = neverMatch;
      const { table } = setup({ columns });
      const body = table.find(TableBody);
      expect(body.find(TableRow)).toHaveLength(0);
    });

    it('should match datetimes', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[4].filterValue = [moment(0).format('x'), ''];
      const { table } = setup({ columns });
      const body = table.find(TableBody);
      expect(body.find(TableRow)).toHaveLength(5);
    });
  });

  describe('sorting', () => {
    it('should sort ascending correctly', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].sortDirection = 'asc';
      const { table } = setup({ columns });
      const systems = table.state('displayData').map(d => d.system);
      expect(systems).toEqual(['complex', 'echo', 'echo', 'echo', 'error', 'sleeper']);
    });

    it('should sort desending correctly', () => {
      const columns = JSON.parse(JSON.stringify(defaultColumns));
      columns[0].sortDirection = 'desc';
      const { table } = setup({ columns });
      const systems = table.state('displayData').map(d => d.system);
      expect(systems).toEqual(['sleeper', 'error', 'echo', 'echo', 'echo', 'complex']);
    });
  });
});
