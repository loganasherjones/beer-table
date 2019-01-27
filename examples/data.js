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
    createdAt = startdate
      .clone()
      .subtract(index, 'minutes')
      .format('x');
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

const startDates = [
  startdate.format('x'),
  startdate
    .clone()
    .subtract(5, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(6, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(7, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(8, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(9, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(10, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(11, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(12, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(13, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(14, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(15, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(16, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(17, 'minutes')
    .format('x'),
  startdate
    .clone()
    .subtract(1, 'day')
    .format('x'),
  startdate
    .clone()
    .subtract(1, 'month')
    .format('x'),
  startdate
    .clone()
    .subtract(1, 'year')
    .format('x'),
];

const DATA = [
  createData('echo', 'say', '1.0.0', 'IN_PROGRESS', startDates[0], null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startDates[1], null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startDates[2], null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startDates[3], null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startDates[4], null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startDates[5], null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startDates[6], null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startDates[7], null),
  createData('error', 'say', '1.0.0', 'ERROR', startDates[8], null),
  createData('echo', 'say', '1.0.0', 'ERROR', startDates[9], null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startDates[10], null),
  createData('complex', 'say-sleep', '1.0.0', 'SUCCESS', startDates[11], null),
  createData('complex', 'sleep-say', '1.0.0', 'SUCCESS', startDates[12], null),
  createData('complex', 'say-sleep', '1.0.0', 'SUCCESS', startDates[13], null),
  createData('sleeper', 'sleep', '1.0.0', 'SUCCESS', startDates[14], null),
  createData('sleeper', 'sleep', '1.0.0', 'SUCCESS', startDates[15], null),
  createData('echo', 'say', '1.0.0', 'SUCCESS', startDates[16], 'first!'),
];

export default DATA;
