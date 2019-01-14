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

export const defaultColumns = [
  { name: 'System', id: 'system' },
  { name: 'Command', id: 'command' },
  { name: 'System Version', id: 'systemVersion' },
  { name: 'Status', id: 'status' },
  { name: 'Created At', id: 'createdAt' },
  { name: 'Comment', id: 'comment' },
];

export const startdate = moment(0).add(5, 'minutes');
export const defaultData = [
  createData('echo', 'say', '1.0.0', 'IN_PROGRESS', startdate.format('x'), null),
  createData(
    'complex',
    'say-sleep',
    '1.1.0',
    'SUCCESS',
    startdate
      .clone()
      .subtract(1, 'minutes')
      .format('x'),
    null,
  ),
  createData(
    'sleeper',
    'sleep',
    '0.1.0',
    'SUCCESS',
    startdate
      .clone()
      .subtract(2, 'minutes')
      .format('x'),
    'waiting',
  ),
  createData(
    'error',
    'error',
    '1.0.0',
    'SUCCESS',
    startdate
      .clone()
      .subtract(3, 'minutes')
      .format('x'),
    null,
  ),
  createData(
    'echo',
    'say',
    '1.0.0',
    'SUCCESS',
    startdate
      .clone()
      .subtract(4, 'minutes')
      .format('x'),
    null,
  ),
  createData(
    'echo',
    'say',
    '0.1.0',
    'SUCCESS',
    startdate
      .clone()
      .subtract(5, 'minutes')
      .format('x'),
    'first!',
  ),
];
