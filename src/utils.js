export default {
  datetimeMatch,
  defaultMatch,
  defaultSort,
  isEmpty,
  exists,
};

function isEmpty(val) {
  if (!exists(val)) return true;
  if (Array.isArray(val) || typeof obj === 'string') return val.length === 0;
  for (var key in val) if (hasOwnProperty.call(val, key)) return false;
  return true;
}

function exists(val) {
  return !(val === null || val === undefined);
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

function defaultSort(name, direction) {
  let sortOrder = 1;
  if (direction === 'desc') {
    sortOrder = -1;
  }

  return function(a, b) {
    a = a[name];
    b = b[name];

    // Force nulls/undefineds to bottom
    if (!exists(a) && !exists(b)) {
      return 0;
    } else if (!exists(a)) {
      return 1;
    } else if (!exists(b)) {
      return -1;
    }

    // force any string values to lowercase
    a = typeof a === 'string' ? a.toLowerCase() : a;
    b = typeof b === 'string' ? b.toLowerCase() : b;
    // Return either 1 or -1 to indicate a sort priority
    if (a > b) {
      return 1 * sortOrder;
    }
    if (a < b) {
      return -1 * sortOrder;
    }
    // returning 0, undefined or any falsey value will use subsequent sorts or
    // the index as a tiebreaker
    return 0;
  };
}
