import Control from '../util/Control.js';

const TYPE_TRANSLATIONS_OBJ = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const getPopupFeaturesNode = (featuresArr) => {
  const popupFeatures = new Control(undefined, 'ul', 'popup__features');

  for (const feature of featuresArr) {
    const someFeature = new Control(
      popupFeatures.node,
      'li',
      `popup__feature popup__feature--${feature}`
    );
  }

  return popupFeatures.node;
};

const getPopupPhotosNode = (photosArr) => {
  const photos = new Control(
    undefined,
    'div',
    'popup__photos'
  );

  for (const photo of photosArr) {
    const popupPhoto = new Control(
      photos.node,
      'img',
      'popup__photo',
    );
    popupPhoto.node.src = photo;
    popupPhoto.node.width = '45';
    popupPhoto.node.height = '40';
    popupPhoto.node.alt = 'Фотография жилья';
  }

  return photos.node;
};

const getCardNode = (cardDataObj) => {
  const { author, offer, location } = cardDataObj;

  const card = new Control(undefined, 'div');
  card.setId('card');

  const popup = new Control(card.node, 'article', 'popup');

  if (author.avatar) {
    const popupAvatar = new Control(popup.node, 'img', 'popup__avatar');
    popupAvatar.node.src = author.avatar;
    popupAvatar.node.width = 70;
    popupAvatar.node.height = 70;
    popupAvatar.node.alt = 'Аватар пользователя';
  }

  const popupTitle = offer.title && new Control(
    popup.node,
    'h3',
    'popup__title',
    offer.title
  );

  const popupTextAddress = offer.address && new Control(
    popup.node,
    'p',
    'popup__text popup__text--address',
    offer.address
  );

  const popupTextPrice = offer.price && new Control(
    popup.node,
    'p',
    'popup__text popup__text--price',
    `${offer.price}  ₽/ночь`
  );

  const popupType = offer.type && new Control(
    popup.node,
    'h4',
    'popup__type',
    TYPE_TRANSLATIONS_OBJ[offer.type]
  );

  const roomCapacity = new Control(
    popup.node,
    'p',
    'popup__text popup__text--capacity',
    `${offer.rooms} комнаты для ${offer.guests} гостей`
  );
  if (!offer.rooms || !offer.guests) {
    roomCapacity.node.classList.add('hidden');
  }

  const regTime = new Control(
    popup.node,
    'p',
    'popup__text popup__text--time',
    `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`
  );
  if (!offer.checkin || !offer.checkout) {
    regTime.node.classList.add('hidden');
  }

  if (offer.features.length > 0) {
    const popupFeaturesNode = getPopupFeaturesNode(offer.features);
    popup.node.append(popupFeaturesNode);
  }

  const popupDescription = new Control(
    popup.node,
    'p',
    'popup__description',
    offer.description
  );
  if (!offer.description) {
    popupDescription.node.classList.add('hidden');
  }

  if (offer.photos) {
    const popupPhotosNode = getPopupPhotosNode(offer.photos);
    popup.node.append(popupPhotosNode);
  }

  return card.node;
};

const getCardsNodesArr = (cardsDataArr) => {
  const cardsNodesArr = [];
  cardsNodesArr.length = cardsDataArr.length;

  cardsDataArr.forEach((cardDataItem, index) => {
    const cardNode = getCardNode(cardDataItem);
    cardsNodesArr[index] = cardNode;
  });

  return cardsNodesArr;
};

export const updateMarkup = (cardDataArr) => {
  const mapCanvas = document.getElementById('map-canvas');
  const myCards = getCardsNodesArr(cardDataArr);
  const testCard = myCards[0];
  mapCanvas.append(testCard);
};
