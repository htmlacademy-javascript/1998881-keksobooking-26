const getRandomHelper = (from, to) => {
  if (from >= to) throw new Error('From is higher, then to');
  const randomPart = Math.random();
  const range = to - from;
  const randomNum = from + (range * randomPart);
  return randomNum;
}

const getRandomNum = (from, to) => {
  const randomNum = getRandomHelper(from, to);
  const randomNumRounded = Math.round(randomNum);
  return randomNumRounded;
};

const getRandomFloat = (from, to, floatLength) => {
  const randomNum = getRandomHelper(from, to);
  const randomNumRounded = randomNum.toFixed(floatLength);
  return randomNumRounded;
};

try {
  console.log(getRandomNum(5, 8));
  console.log(getRandomFloat(5, 8, 3));
} catch(err) {
  console.error(err);
}
