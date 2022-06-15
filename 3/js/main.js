const generateObjArr = () => {
  const getRandomHelper = (a, b) => {
    const lower = Math.min(Math.abs(a), Math.abs(b))
    const upper = Math.max(Math.abs(a), Math.abs(b))
    const randomNum = Math.random() * (upper - lower + 1) + lower;
    return randomNum;
  }
  const getRandomNum = (from, to) => {
    const randomNum = getRandomHelper(from, to);
    const randomNumRounded = Math.floor(randomNum);
    return randomNumRounded;
  };
  const getRandomFloat = (from, to, floatLength) => {
    const randomNum = getRandomHelper(from, to);
    const randomNumRounded = randomNum.toFixed(floatLength);
    return randomNumRounded;
  };
  const getRandomItem = (arr) => {
    const randomIndex = getRandomNum(0, arr.length - 1);
    return arr[randomIndex];
  }
  const getRandomArr = (arr) => {
    const getShuffledArr = (arr) => {
      const array = arr;
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
    const shuffledArr = getShuffledArr(arr);
    const start = getRandomNum(0, shuffledArr.length - 1);
    const myArr = shuffledArr.slice(start);
    return myArr;
  };

  const objArr = [];
  objArr.length = 10;

  for (const [index] of objArr.entries()) {

    const randomInt = getRandomNum(1, 10);
    const locationLat = getRandomFloat(35.65000, 35.70000, 5);
    const locationLng = getRandomFloat(139.70000, 139.80000, 5);

    const photosArr = [
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
      'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
    ];
    const myPhotos = getRandomArr(photosArr);

    objArr[index] = {
      author: {
        avatar: `img/avatars/user${randomInt}.png`,
      },
      offer: {
        title: `Title number ${index}`,
        address: `${locationLat}, ${locationLng}`,
        price: getRandomNum(1, 10),
        type: `${getRandomItem(['palace', 'flat', 'house', 'bungalow', 'hotel'])}`,
        rooms: getRandomNum(1, 5),
        guests: getRandomNum(1, 2),
        checkin: `${getRandomItem(['12:00', '13:00', '14:00'])}`,
        checkout: `${getRandomItem(['12:00', '13:00', '14:00'])}`,
        features: getRandomArr(['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner']),
        description: 'Some description',
        photos: myPhotos,
      },
      location: {
        lat: locationLat,
        lng: locationLng,
      },
    }
  }
  return objArr;
};
const cardsArr = generateObjArr();
console.log('cardsArr: ', cardsArr);
