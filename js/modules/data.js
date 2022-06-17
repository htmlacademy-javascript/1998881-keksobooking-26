import { getRandomArr, getRandomFloat, getRandomItem, getRandomInt, getTwoDigitStr } from './util.js';

const LOCATION_LAT = { from: 35.65000, to: 35.70000, };
const LOCATION_LNG = { from: 139.70000, to: 139.80000, };
const REALTY_TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const MAX_ROOMS_COUNT = 5;
const PRICE_RANGE = { min: 250, max: 50000 };
const MAX_GUESTS_COUNT = 10;
const CHECKIN_HOURS = ['12:00', '13:00', '14:00'];
const CHECKOUT_HOURS = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const DESCRIPTION_TEMPLATE = 'I am a big description string!';

const getAutor = () => {
  const randomInt = getRandomInt(1, 10);
  const randomUserIdStr = getTwoDigitStr(randomInt);

  return {
    avatar: `img/avatars/user${randomUserIdStr}.png`,
  };
};

const getOffer = (locationLat, locationLng) => {
  const descrTemplateLength = DESCRIPTION_TEMPLATE.length;
  const subStrStart = getRandomInt(0, descrTemplateLength - 1);
  const subStrEnd = getRandomInt(subStrStart, descrTemplateLength - 1);

  return {
    title: 'Self-chosen title.',
    address: `${locationLat}, ${locationLng}`,
    price: getRandomInt(PRICE_RANGE.min, PRICE_RANGE.max),
    type: `${getRandomItem(REALTY_TYPES)}`,
    rooms: getRandomInt(1, MAX_ROOMS_COUNT),
    guests: getRandomInt(1, MAX_GUESTS_COUNT),
    checkin: `${getRandomItem(CHECKIN_HOURS)}`,
    checkout: `${getRandomItem(CHECKOUT_HOURS)}`,
    features: getRandomArr(FEATURES),
    photos: getRandomArr(PHOTOS),
    description: DESCRIPTION_TEMPLATE.substring(subStrStart, subStrEnd),
  };
};

const getLocation = (locationLat, locationLng) => ({
  lat: locationLat,
  lng: locationLng,
});

const getCard = () => {
  const cardLocationLat = getRandomFloat(LOCATION_LAT.from, LOCATION_LAT.from, 5);
  const cardLocationLng = getRandomFloat(LOCATION_LNG.from, LOCATION_LNG.from, 5);

  return {
    author: getAutor(),
    offer: getOffer(cardLocationLat, cardLocationLng),
    location: getLocation(cardLocationLat, cardLocationLng),
  };
};

export const getCardsArr = (cardsCount) => Array.from({ length: cardsCount }, getCard);
