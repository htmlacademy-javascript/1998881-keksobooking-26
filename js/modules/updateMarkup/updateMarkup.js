import { getCardData } from './../data.js';

const TYPE_TRANSLATIONS_OBJ = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const injectText = (node, text) => {
  if (text) {
    node.textContent = text;
  }
};

const getCard = (template) => {
  const cardNode = template.cloneNode(true);
  const { author, offer } = getCardData();

  injectText(cardNode.querySelector('.title'), offer.title);
  injectText(cardNode.querySelector('.popup__text--address'), offer.address);
  injectText(cardNode.querySelector('.popup__text--price'), `${offer.price}  ₽/ночь`);
  injectText(cardNode.querySelector('.popup__type'), TYPE_TRANSLATIONS_OBJ[offer.type]);
  injectText(
    cardNode.querySelector('. .popup__text--capacity'),
    `${offer.rooms} комнаты для ${offer.guests} гостей`
  );
  injectText(
    cardNode.querySelector('.popup__text--time'),
    `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`
  );
  // injectText(
  //   cardNode.querySelector('.popup__features'),
  //   offer.features
  // );
  injectText(
    cardNode.querySelector('.popup__description'),
    offer.description
  );
  injectText(
    cardNode.querySelector('.popup__photos'),
    offer.photos
  );
  const avatar = cardNode.querySelector('.popup__avatar');
  avatar.src = author.avatar;

  return cardNode;
};

const getCardsNodes = (template) => {
  const cards = Array.from({ length: 10 }, () => getCard(template));

  return cards;
};

export const updateMarkup = () => {
  const template = document.getElementById('card');
  const myCards = getCardsNodes(template);
  const mapCanvas = document.getElementById('map-canvas');
  mapCanvas.append(myCards[0]);
};
