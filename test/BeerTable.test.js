import React from 'react';
import { shallow } from 'enzyme';

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
  const table = shallow(<BeerTable {...props} />);
  return {
    table,
    props,
  };
};

describe('<BeerTable />', () => {
  it('renders a header and body', () => {
    const { table } = setup();
    expect(table.dive().find(BeerHead)).toHaveLength(1);
    expect(table.dive().find(TableBody)).toHaveLength(1);
  });

  describe('filtering', () => {
    it('should do exact filtering', () => {
      const columns = Object.assign(defaultColumns);
      columns[0].filterValue = 'echo';
      const { table } = setup({ columns });
      const body = table.dive().find(TableBody);
      expect(body.find(TableRow)).toHaveLength(3);
    });

    it('should do partial matching', () => {
      const columns = Object.assign(defaultColumns);
      columns[0].filterValue = 'c';
      const { table } = setup({ columns });
      const body = table.dive().find(TableBody);
      expect(body.find(TableRow)).toHaveLength(4);
    });

    it('should handle multiple filters with and logic', () => {
      const columns = Object.assign(defaultColumns);
      columns[0].filterValue = 'c';
      columns[1].filterValue = 'sleep';
      const { table } = setup({ columns });
      const body = table.dive().find(TableBody);
      expect(body.find(TableRow)).toHaveLength(1);
    });

    it('should respect custom filtering functions', () => {
      const neverMatch = (columnVal, filterVal) => {
        return false;
      };
      const columns = Object.assign(defaultColumns);
      columns[0].filterValue = 'echo';
      columns[0].customMatch = neverMatch;
      const { table } = setup({ columns });
      const body = table.dive().find(TableBody);
      expect(body.find(TableRow)).toHaveLength(0);
    });
  });
});
