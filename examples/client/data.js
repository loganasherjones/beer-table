import moment from 'moment';

let currentId = 1;
const createData = (system, command, systemVersion, status, createdAt, comment) => {
  currentId += 1;
  return {
    system,
    command,
    systemVersion,
    status,
    createdAt: parseInt(createdAt),
    comment,
  };
};

const startdate = moment();

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const BIG_DATA = [...Array(1000).keys()].map(index => {
  const system = 'system' + (index % 10).toString();
  const command = 'commandName';
  const systemVersion = `${getRandomInt(1, 5)}.0.${getRandomInt(0, 1)}`;
  let status;
  let createdAt;
  if (index !== 0) {
    startdate.subtract(index, 'minutes').format('x');
    if (getRandomInt(0, 1)) {
      status = 'SUCCESS';
    } else {
      status = 'ERROR';
    }
  } else {
    createdAt = startdate.format('x');
    status = 'IN_PROGRESS';
  }

  return createData(system, command, systemVersion, status, createdAt, null);
});

const DATA = [
  createData('echo', 'say', '1.0.0', 'IN_PROGRESS', startdate.format('x'), null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startdate.subtract(5, 'minutes').format('x'), null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startdate.subtract(6, 'minutes').format('x'), null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startdate.subtract(7, 'minutes').format('x'), null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startdate.subtract(8, 'minutes').format('x'), null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startdate.subtract(9, 'minutes').format('x'), null),
  createData(
    'echo',
    'say',
    '1.0.0',
    'SUCCESS',
    startdate.subtract(10, 'minutes').format('x'),
    null,
  ),
  createData(
    'echo',
    'say',
    '1.0.0',
    'SUCCESS',
    startdate.subtract(11, 'minutes').format('x'),
    null,
  ),
  createData('error', 'say', '1.0.0', 'ERROR', startdate.subtract(12, 'minutes').format('x'), null),
  createData('echo', 'say', '1.0.0', 'ERROR', startdate.subtract(13, 'minutes').format('x'), null),
  createData(
    'echo',
    'say',
    '1.0.0',
    'SUCCESS',
    startdate.subtract(14, 'minutes').format('x'),
    null,
  ),
  createData(
    'complex',
    'say-sleep',
    '1.0.0',
    'SUCCESS',
    startdate.subtract(15, 'minutes').format('x'),
    null,
  ),
  createData(
    'complex',
    'sleep-say',
    '1.0.0',
    'SUCCESS',
    startdate.subtract(16, 'minutes').format('x'),
    null,
  ),
  createData(
    'complex',
    'say-sleep',
    '1.0.0',
    'SUCCESS',
    startdate.subtract(17, 'minutes').format('x'),
    null,
  ),
  createData(
    'sleeper',
    'sleep',
    '1.0.0',
    'SUCCESS',
    startdate.subtract(1, 'day').format('x'),
    null,
  ),
  createData(
    'sleeper',
    'sleep',
    '1.0.0',
    'SUCCESS',
    startdate.subtract(1, 'month').format('x'),
    null,
  ),
  createData(
    'echo',
    'say',
    '1.0.0',
    'SUCCESS',
    startdate.subtract(1, 'year').format('x'),
    'first!',
  ),
];

export default DATA;
