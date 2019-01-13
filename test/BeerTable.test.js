import React from 'react';
import { shallow } from 'enzyme';

import BeerTable from '../src/index';

describe('<BeerTable />', () => {
  it('renders a div', () => {
    const wrapper = shallow(<BeerTable text="testText" />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
