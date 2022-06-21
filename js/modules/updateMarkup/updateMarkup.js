import { getCardData } from './../data.js';

const TYPE_TRANSLATIONS_OBJ = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const injectText = (node, text, ...data) => {
  if (data.every(item => item)) {
    node.textContent = text;
  } else {
    node.remove();
  }
};

const addFeatures = (cardNode, features) => {
  const featuresList = cardNode.querySelector('.popup__features');
  featuresList.textContent = '';

  const featureNodes = features.map(featureData => {
    const featureNode = document.createElement('li');
    featureNode.classList.add('popup__feature', `popup__feature--${featureData}`);

    return featureNode;
  });

  featuresList.append(...featureNodes);
};

const addPhotos = (cardNode, photosLinks) => {
  const photosContainer = cardNode.querySelector('.popup__photos');
  const templatePhotoNode = cardNode.querySelector('.popup__photo');
  
  const photosNodes = photosLinks.map(photoLink => {
    const photoNode = templatePhotoNode.cloneNode(false);
    photoNode.src = photoLink;
    
    return photoNode;
  });
  
  templatePhotoNode.remove();
  photosContainer.append(...photosNodes);
};

const getCard = (template) => {
  const cardNode = template.cloneNode(true);
  const { author, offer } = getCardData();

  injectText(cardNode.querySelector('.popup__title'), offer.title, offer.title);
  injectText(cardNode.querySelector('.popup__text--address'), offer.address, offer.address);
  injectText(
    cardNode.querySelector('.popup__text--price'),
    `${offer.price}  ₽/ночь`,
    offer.price
  );
  injectText(cardNode.querySelector(
    '.popup__type'),
    TYPE_TRANSLATIONS_OBJ[offer.type],
    offer.type
  );
  injectText(
    cardNode.querySelector('.popup__text--capacity'),
    `${offer.rooms} комнаты для ${offer.guests} гостей`,
    offer.rooms,
    offer.guests
  );
  injectText(
    cardNode.querySelector('.popup__text--time'),
    `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`,
    offer.checkin,
    offer.checkout
  );

  addFeatures(cardNode, offer.features);

  injectText(
    cardNode.querySelector('.popup__description'),
    offer.description,
    offer.description
  );

  addPhotos(cardNode, offer.photos);

  const avatar = cardNode.querySelector('.popup__avatar');
  avatar.src = author.avatar;

  return cardNode;
};

const getCardsNodes = (template) => {
  const cards = Array.from({ length: 10 }, () => getCard(template));

  return cards;
};

export const updateMarkup = () => {
  const templateFragment = document.getElementById('card').content;
  const myCards = getCardsNodes(templateFragment);
  const mapCanvas = document.getElementById('map-canvas');
  mapCanvas.append(myCards[0]);
};
