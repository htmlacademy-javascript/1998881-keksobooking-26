import { getCardData } from './../data.js';

const TYPE_TRANSLATIONS_OBJ = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const injectText = (node, text, ...data) => {
  if (data.every((dataItem) => dataItem)) {
    node.textContent = text;
  } else {
    node.remove();
  }
};

const addFeatures = (cardNode, features) => {
  const featuresNodes = cardNode.querySelectorAll('.popup__feature');

  featuresNodes.forEach((featureNode) => {
    const featureNodeIsNeeded = features.some((feature) => (
      featureNode.classList.contains(`popup__feature--${feature}`)
    ));
    if (!featureNodeIsNeeded) {
      featureNode.remove();
    }
  });
};

const addPhotos = (cardNode, photosLinks) => {
  const photosContainer = cardNode.querySelector('.popup__photos');
  const templatePhotoNode = cardNode.querySelector('.popup__photo');

  photosLinks.forEach((photoLink, index) => {
    if (index === 0) {
      templatePhotoNode.src = photoLink;
    } else {
      const photoNode = templatePhotoNode.cloneNode(false);
      photoNode.src = photoLink;
      photosContainer.append(photoNode);
    }
  });
};

const getCard = (template) => {
  const cardNode = template.cloneNode(true);
  const { author, offer } = getCardData();

  injectText(
    cardNode.querySelector('.popup__title'),
    offer.title,
    offer.title
  );

  injectText(
    cardNode.querySelector('.popup__text--address'),
    offer.address,
    offer.address
  );

  injectText(
    cardNode.querySelector('.popup__text--price').firstChild,
    `${offer.price} `,
    offer.price
  );

  injectText(
    cardNode.querySelector('.popup__type'),
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

  injectText(
    cardNode.querySelector('.popup__description'),
    offer.description,
    offer.description
  );

  addFeatures(cardNode, offer.features);

  addPhotos(cardNode, offer.photos);

  const avatar = cardNode.querySelector('.popup__avatar');
  avatar.src = author.avatar;

  return cardNode;
};

export const updateMarkup = () => {
  const template = document.getElementById('card').content;
  const myCards = Array.from({ length: 10 }, () => getCard(template));
  const mapCanvas = document.getElementById('map-canvas');
  mapCanvas.append(myCards[0]);
};
