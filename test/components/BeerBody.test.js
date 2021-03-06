import React from 'react';
import { shallow } from 'enzyme';
import { defaultColumns, defaultData } from '../utils';

import CircularProgress from '@material-ui/core/CircularProgress';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import BeerBody from '../../src/components/BeerBody';

const setup = overrideProps => {
  const props = Object.assign(
    {
      columns: [defaultColumns[0]],
      loading: false,
      displayData: defaultData,
    },
    overrideProps,
  );
  const body = shallow(<BeerBody {...props} />);
  return { body, props };
};

describe('<BeerBody />', () => {
  describe('render', () => {
    it('should render the correct number of rows', () => {
      const { body } = setup();
      expect(body.find(TableRow)).toHaveLength(6);
    });

    it('should render typography on empty data', () => {
      const { body } = setup({ displayData: [] });
      expect(body.find(TableRow)).toHaveLength(1);
      expect(body.find(Typography)).toHaveLength(2);
    });

    it('should render another message if a filter is active', () => {
      const column = JSON.parse(JSON.stringify(defaultColumns[0]));
      column.filterValue = 'someValue';
      const { body } = setup({ displayData: [], columns: [column] });
      expect(body.find(TableRow)).toHaveLength(1);
      expect(body.find(Typography)).toHaveLength(4);
    });

    it('should render a spinner when loading is true', () => {
      const { body } = setup({ loading: true });
      expect(body.find(CircularProgress)).toHaveLength(1);
    });
  });
});
