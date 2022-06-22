const getRandom = (num1, num2) => {
  const lower = Math.min(Math.abs(num1), Math.abs(num2));
  const upper = Math.max(Math.abs(num1), Math.abs(num2));
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
  const randomIndex = getRandomInt(0, arr.length - 1);

  return arr[randomIndex];
};

const getShuffledArr = (arr) => {
  const newArr = arr;

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = newArr[i];
    newArr[i] = newArr[j];
    newArr[j] = temp;
  }

  return newArr;
};

export const getRandomArr = (arr) => {
  const shuffledArr = getShuffledArr(arr);
  const start = getRandomInt(0, shuffledArr.length - 1);
  const myArr = shuffledArr.slice(start);

  return myArr;
};
