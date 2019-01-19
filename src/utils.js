export default {
  datetimeMatch,
  defaultMatch,
  defaultSort,
  isEmpty,
};

function isEmpty(val) {
  if (val == null || val === undefined) return true;
  if (Array.isArray(val) || typeof obj === 'string') return val.length === 0;
  for (var key in val) if (hasOwnProperty.call(val, key)) return false;
  return true;
}

function defaultMatch(a, b) {
  return (
    a
      .toString()
      .toLowerCase()
      .indexOf(b.toString().toLowerCase()) >= 0
  );
}

function datetimeMatch(value, begin, end) {
  if (begin && end) {
    return begin < value && value < end;
  } else if (begin) {
    return begin < value;
  } else {
    return value < end;
  }
}

function defaultSort(a, b, direction) {
  // force null and undefined to the bottom
  a = a === null || a === undefined ? '' : a;
  b = b === null || b === undefined ? '' : b;
  // force any string values to lowercase
  a = typeof a === 'string' ? a.toLowerCase() : a;
  b = typeof b === 'string' ? b.toLowerCase() : b;
  // Return either 1 or -1 to indicate a sort priority
  if (a > b) {
    return 1;
  }
  if (a < b) {
    return -1;
  }
  // returning 0, undefined or any falsey value will use subsequent sorts or
  // the index as a tiebreaker
  return 0;
}
