const getRandom = (a, b) => {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const randomNum = Math.random() * (upper - lower + 1) + lower;

  return randomNum;
};

export const getRandomInt = (from, to) => {
  const randomNum = getRandom(from, to);
  const randomNumRounded = Math.floor(randomNum);

  return randomNumRounded;
};

export const getRandomFloat = (from, to, floatLength) => {
  const randomNum = getRandom(from, to);
  const randomNumRounded = randomNum.toFixed(floatLength);

  return randomNumRounded;
};

export const getTwoDigitStr = (num) => {
  if (num >= 10) {
    return `${num}`;
  }

  return `0${num}`;
};

export const getRandomItem = (arr) => {
  const randomIndex = getRandomNum(0, arr.length - 1);

  return arr[randomIndex];
};

const getShuffledArr = (arr) => {
  const array = arr;
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  return array;
};

const getRandomArrItem = (arr) => {
  return arr[getRandomInt(0, arr.length - 1)];
};

export const getRandomArr = (arr) => {
  const randomLength = getRandom(1, arr.length);

  return Array.from({length: randomLength}, getRandomArrItem(arr));
};
