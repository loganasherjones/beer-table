import moment from 'moment';

export const createData = (system, command, systemVersion, status, createdAt, comment) => {
  return {
    system,
    command,
    systemVersion,
    status,
    createdAt: parseInt(createdAt),
    comment,
  };
};

export const defaultPagination = {
  currentPageNum: 0,
  rowsPerPageOptions: [10, 25, 50, 100],
  rowsPerPage: 10,
};

export const defaultColumns = [
  { name: 'System', id: 'system', key: 'system' },
  { name: 'Command', id: 'command', key: 'command' },
  { name: 'System Version', id: 'systemVersion', key: 'systemVersion' },
  { name: 'Status', id: 'status', key: 'status' },
  { name: 'Created At', id: 'createdAt', key: 'createdAt', datetime: true, filterValue: ['', ''] },
  { name: 'Comment', id: 'comment', key: 'comment' },
];

const startDate = moment(0).add(5, 'minutes');
const startDates = [
  startDate.format('x'),
  startDate
    .clone()
    .subtract(1, 'minutes')
    .format('x'),
  startDate
    .clone()
    .subtract(2, 'minutes')
    .format('x'),
  startDate
    .clone()
    .subtract(3, 'minutes')
    .format('x'),
  startDate
    .clone()
    .subtract(4, 'minutes')
    .format('x'),
  startDate
    .clone()
    .subtract(5, 'minutes')
    .format('x'),
];

export const defaultData = [
  createData('echo', 'say', '1.0.0', 'IN_PROGRESS', startDates[0], null),
  createData('complex', 'say-sleep', '1.1.0', 'SUCCESS', startDates[1], null),
  createData('sleeper', 'sleep', '0.1.0', 'SUCCESS', startDates[2], 'waiting'),
  createData('error', 'error', '1.0.0', 'SUCCESS', startDates[3], null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startDates[4], null),
  createData('echo', 'say', '0.1.0', 'SUCCESS', startDates[5], 'first!'),
];
