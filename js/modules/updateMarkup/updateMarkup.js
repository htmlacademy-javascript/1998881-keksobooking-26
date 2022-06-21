import { getCardData } from './../data.js';

const USE_METHODS_V2 = false;

const TYPE_TRANSLATIONS_OBJ = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const injectText = (node, text, ...data) => {
  if (data.every((item) => item)) {
    node.textContent = text;
  } else {
    node.remove();
  }
};

const addFeatures = (cardNode, features) => {
  const featuresList = cardNode.querySelector('.popup__features');
  featuresList.textContent = '';

  const featureNodes = features.map((featureData) => {
    const featureNode = document.createElement('li');
    featureNode.classList.add('popup__feature', `popup__feature--${featureData}`);

    return featureNode;
  });

  featuresList.append(...featureNodes);
};

const addFeaturesV2 = (cardNode, features) => {
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

  const photosNodes = photosLinks.map((photoLink) => {
    const photoNode = templatePhotoNode.cloneNode(false);
    photoNode.src = photoLink;

    return photoNode;
  });

  templatePhotoNode.remove();
  photosContainer.append(...photosNodes);
};

const addPhotosV2 = (cardNode, photosLinks) => {
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
  
  // const priceNode = cardNode.querySelector('.popup__text--price');
  // const priceValueNode = priceNode.firstChild;
  // priceValueNode.textContent = `${offer.price} `;

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

  if (USE_METHODS_V2) {
    addFeatures(cardNode, offer.features);
    addPhotos(cardNode, offer.photos);
  } else {
    addFeaturesV2(cardNode, offer.features);
    addPhotosV2(cardNode, offer.photos);
  }

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
