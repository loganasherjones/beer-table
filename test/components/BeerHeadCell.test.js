import React from 'react';
import { mount } from 'enzyme';
import { defaultColumns } from '../utils';

import { Button, TextField } from '@material-ui/core';
import { Sort, ArrowDownward, ArrowUpward } from '@material-ui/icons';
import BeerHeadCell from '../../src/components/BeerHeadCell';

const setup = overrideProps => {
  const props = Object.assign(
    {
      column: defaultColumns[0],
      onFilterUpdate: jest.fn(),
      sortDirection: null,
      filterValue: '',
    },
    overrideProps,
  );
  const cell = mount(
    <table>
      <tbody>
        <tr>
          <BeerHeadCell {...props} />
        </tr>
      </tbody>
    </table>,
  );
  return { cell, props };
};

describe('<BeerHeadCell />', () => {
  describe('render', () => {
    test('should render sort icon when no sort direction', () => {
      const { cell } = setup();
      expect(cell.find(Sort)).toHaveLength(1);
      expect(cell.find(ArrowDownward)).toHaveLength(0);
      expect(cell.find(ArrowUpward)).toHaveLength(0);
    });

    test('should render down arrow when sortDirection is desc', () => {
      const { cell } = setup({ sortDirection: 'desc' });
      expect(cell.find(Sort)).toHaveLength(0);
      expect(cell.find(ArrowDownward)).toHaveLength(1);
      expect(cell.find(ArrowUpward)).toHaveLength(0);
    });

    test('should render down arrow when sortDirection is asc', () => {
      const { cell } = setup({ sortDirection: 'asc' });
      expect(cell.find(Sort)).toHaveLength(0);
      expect(cell.find(ArrowDownward)).toHaveLength(0);
      expect(cell.find(ArrowUpward)).toHaveLength(1);
    });

    test('button when filterEnum is provided', () => {
      const column = Object.assign({}, defaultColumns[0]);
      column.filterEnum = ['echo', 'complex'];
      const { cell } = setup({ column });
      expect(cell.find(Button)).toHaveLength(1);
    });
  });

  test('forward filter changes', () => {
    const { cell, props } = setup();
    const input = cell.find(TextField);
    input.prop('onChange')({ target: { value: 'newVal' } });
    expect(props.onFilterUpdate).toHaveBeenCalled();
  });
});
