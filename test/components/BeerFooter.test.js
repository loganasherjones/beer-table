import React from 'react';
import { mount } from 'enzyme';
import Typography from '@material-ui/core/Typography';

import BeerFooter from '../../src/components/BeerFooter';

const setup = overrideProps => {
  const props = Object.assign(
    {
      classes: {},
      colSpan: 1,
      count: 10,
      onChangePage: jest.fn(),
      onChangeRowsPerPage: jest.fn(),
      totalCount: 10,
      pagination: {
        rowsPerPageOptions: [5, 10, 20],
        rowsPerPage: 10,
        currentPageNum: 0,
      },
    },
    overrideProps,
  );
  const footer = mount(
    <table>
      <BeerFooter {...props} />
    </table>,
  );
  return { footer, props };
};

describe('<BeerFooter />', () => {
  it('should render unfiltered count correctly', () => {
    const { footer } = setup();
    const paginationInfo = footer.find(Typography).at(1);
    expect(paginationInfo.text()).toEqual('1-10 of 10');
  });

  it('should render filtered count correctly', () => {
    const { footer } = setup({ count: 5, totalCount: 10 });
    const paginationInfo = footer.find(Typography).at(1);
    expect(paginationInfo.text()).toEqual('1-5 of 5 (5 results filtered)');
  });
});
