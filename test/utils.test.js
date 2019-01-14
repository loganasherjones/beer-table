import _ from '../src/utils';

describe('Utilities', () => {
  describe('isEmpty', () => {
    test('null is true', () => {
      expect(_.isEmpty(null)).toBe(true);
    });

    test('undefined is true', () => {
      expect(_.isEmpty(undefined)).toBe(true);
    });

    test('empty string is true', () => {
      expect(_.isEmpty('')).toBe(true);
    });

    test('empty list is true', () => {
      expect(_.isEmpty([])).toBe(true);
    });

    test('empty object is true', () => {
      expect(_.isEmpty({})).toBe(true);
    });
  });

  describe('defaultSort', () => {
    test('null & null', () => {
      expect(_.defaultSort(null, null)).toEqual(0);
    });

    test('push null to bottom', () => {
      expect(_.defaultSort(1, null)).toEqual(1);
      expect(_.defaultSort(null, 1)).toEqual(-1);
    });

    test('ignore case', () => {
      expect(_.defaultSort('asdf', 'ASDF')).toEqual(0);
    });
  });
});
