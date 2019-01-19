import React from 'react';
import { mount } from 'enzyme';
import { defaultColumns } from '../utils';

import moment from 'moment';
import { Button, TextField } from '@material-ui/core';
import { DateTimePicker } from 'material-ui-pickers';
import { Sort, ArrowDownward, ArrowUpward, CalendarToday } from '@material-ui/icons';
import BeerHeadCell from '../../src/components/BeerHeadCell';

const setup = overrideProps => {
  const props = Object.assign(
    {
      column: defaultColumns[0],
      onFilterUpdate: jest.fn(),
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
      const column = JSON.parse(JSON.stringify(defaultColumns[0]));
      column.sortDirection = 'desc';
      const { cell } = setup({ column });
      expect(cell.find(Sort)).toHaveLength(0);
      expect(cell.find(ArrowDownward)).toHaveLength(1);
      expect(cell.find(ArrowUpward)).toHaveLength(0);
    });

    test('should render down arrow when sortDirection is asc', () => {
      const column = JSON.parse(JSON.stringify(defaultColumns[0]));
      column.sortDirection = 'asc';
      const { cell } = setup({ column });
      expect(cell.find(Sort)).toHaveLength(0);
      expect(cell.find(ArrowDownward)).toHaveLength(0);
      expect(cell.find(ArrowUpward)).toHaveLength(1);
    });

    test('button when filterEnum is provided', () => {
      const column = JSON.parse(JSON.stringify(defaultColumns[0]));
      column.filterEnum = ['echo', 'complex'];
      const { cell } = setup({ column });
      expect(cell.find(Button)).toHaveLength(1);
    });

    test('datetime pickers when datetime is provided', () => {
      const column = JSON.parse(JSON.stringify(defaultColumns[4]));
      const { cell } = setup({ column });
      expect(cell.find(DateTimePicker)).toHaveLength(2);
      expect(cell.find(CalendarToday)).toHaveLength(2);
    });
  });

  test('forward filter changes', () => {
    const { cell, props } = setup();
    const input = cell.find(TextField);
    input.prop('onChange')({ target: { value: 'newVal' } });
    expect(props.onFilterUpdate).toHaveBeenCalled();
  });

  test('datetime end time change', () => {
    const column = JSON.parse(JSON.stringify(defaultColumns[4]));
    const { cell, props } = setup({ column });
    const picker = cell.find(DateTimePicker).at(1);
    picker.prop('onChange')(moment(0));
    expect(props.onFilterUpdate).toHaveBeenCalledWith(column, ['', 0]);
  });

  test('datetime begin time change', () => {
    const column = JSON.parse(JSON.stringify(defaultColumns[4]));
    const { cell, props } = setup({ column });
    const picker = cell.find(DateTimePicker).at(0);
    picker.prop('onChange')(moment(0));
    expect(props.onFilterUpdate).toHaveBeenCalledWith(column, [0, '']);
  });

  test('datetime clear', () => {
    const column = JSON.parse(JSON.stringify(defaultColumns[4]));
    const { cell, props } = setup({ column });
    const picker = cell.find(DateTimePicker).at(0);
    picker.prop('onChange')(null);
    expect(props.onFilterUpdate).toHaveBeenCalledWith(column, ['', '']);
  });
});
