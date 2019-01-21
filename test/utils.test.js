import moment from 'moment';
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

  describe('isEmptyFilter', () => {
    it('should return true for a default datetime filter', () => {
      expect(_.isEmptyFilter(['', ''])).toBe(true);
    });

    it('should return false if the datetime filter has something in it', () => {
      expect(_.isEmptyFilter([1, ''])).toBe(false);
    });
  });

  describe('defaultSort', () => {
    test('should push nulls/undefined to the bottom on desc', () => {
      const unsorted = [{ a: 1 }, { a: null }, { a: undefined }, { a: 4 }];
      const expected = [{ a: 4 }, { a: 1 }, { a: null }, { a: undefined }];
      expect(unsorted.sort(_.defaultSort('a', 'desc'))).toEqual(expected);
    });

    test('should push nulls/undefined to the bottom on asc', () => {
      const unsorted = [{ a: 1 }, { a: null }, { a: undefined }, { a: 4 }];
      const expected = [{ a: 1 }, { a: 4 }, { a: null }, { a: undefined }];
      expect(unsorted.sort(_.defaultSort('a', 'asc'))).toEqual(expected);
    });

    test('Ascending sort with duplicates', () => {
      const unsorted = [{ a: 4 }, { a: 2 }, { a: 2 }, { a: 1 }];
      const expected = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 4 }];
      expect(unsorted.sort(_.defaultSort('a', 'asc'))).toEqual(expected);
    });

    test('Descending sort with duplicates', () => {
      const unsorted = [{ a: 1 }, { a: 2 }, { a: 2 }, { a: 4 }];
      const expected = [{ a: 4 }, { a: 2 }, { a: 2 }, { a: 1 }];
      expect(unsorted.sort(_.defaultSort('a', 'desc'))).toEqual(expected);
    });
  });

  describe('defaultMatch', () => {
    test('same is true', () => {
      expect(_.defaultMatch(1, 1)).toBe(true);
      expect(_.defaultMatch('1', '1')).toBe(true);
    });

    test('case insensitive is true', () => {
      expect(_.defaultMatch('abc', 'ABC')).toBe(true);
      expect(_.defaultMatch('ABC', 'abc')).toBe(true);
    });

    test('type insensitive is true', () => {
      expect(_.defaultMatch('123', 123)).toBe(true);
    });

    test('false cases', () => {
      expect(_.defaultMatch(12, '34')).toBe(false);
    });
  });

  describe('datetimeMatch', () => {
    test('only begin time true', () => {
      const value = moment(0);
      const begin = moment(-1);
      const end = null;
      expect(_.datetimeMatch(value, begin, end)).toBe(true);
    });

    test('only begin time false', () => {
      const value = moment(-1);
      const begin = moment(0);
      const end = null;
      expect(_.datetimeMatch(value, begin, end)).toBe(false);
    });

    test('only end time true', () => {
      const value = moment(0);
      const begin = null;
      const end = moment(1);
      expect(_.datetimeMatch(value, begin, end)).toBe(true);
    });

    test('only end time false', () => {
      const value = moment(1);
      const begin = null;
      const end = moment(0);
      expect(_.datetimeMatch(value, begin, end)).toBe(false);
    });

    test('begin and end time true', () => {
      const value = moment(0);
      const begin = moment(-1);
      const end = moment(1);
      expect(_.datetimeMatch(value, begin, end)).toBe(true);
    });

    test('begin and end time false', () => {
      const value = moment(1);
      const begin = moment(-1);
      const end = moment(1);
      expect(_.datetimeMatch(value, begin, end)).toBe(false);
    });
  });
});
