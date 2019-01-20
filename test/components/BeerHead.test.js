import React from 'react';
import { shallow } from 'enzyme';
import { defaultColumns } from '../utils';

import BeerHeadCell from '../../src/components/BeerHeadCell';
import BeerHead from '../../src/components/BeerHead';

const setup = overrideProps => {
  const props = Object.assign(
    {
      columns: defaultColumns,
      onFilterUpdate: jest.fn(),
      onSortUpdate: jest.fn(),
    },
    overrideProps,
  );
  const head = shallow(<BeerHead {...props} />);
  return { head, props };
};

describe('<BeerHead />', () => {
  test('smoke', () => {
    const { head } = setup();
    expect(head.find(BeerHeadCell)).toHaveLength(6);
  });
});
