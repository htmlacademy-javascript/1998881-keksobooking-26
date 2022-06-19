import Control from '../util/Control.js';

const TYPE_TRANSLATIONS_OBJ = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const hideEmpty = (updatedElemsArr) => {
  for (const dependencyArr of updatedElemsArr) {
    const [control, ...dataElemsArr] = dependencyArr;

    for (const dataElem of dataElemsArr) {
      if (!dataElem && !control.node.classList.contains('hidden')) {
        control.node.classList.add('hidden');
      }
    }
  }
};

const getPopupFeatures = (featuresArr) => {
  const popupFeatures = new Control(undefined, 'ul', 'popup__features');

  for (const feature of featuresArr) {
    const someFeature = new Control(
      popupFeatures.node,
      'li',
      `popup__feature popup__feature--${feature}`
    );
    someFeature.doNothing();
  }

  return popupFeatures;
};

const getPopupPhotos = (photosArr) => {
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

  return photos;
};

const getCard = (cardDataObj) => {
  const { author, offer } = cardDataObj;

  const card = new Control(undefined, 'div');
  card.setId('card');

  const popup = new Control(card.node, 'article', 'popup');

  const popupAvatar = new Control(popup.node, 'img', 'popup__avatar');
  popupAvatar.node.src = author.avatar;
  popupAvatar.node.width = 70;
  popupAvatar.node.height = 70;
  popupAvatar.node.alt = 'Аватар пользователя';

  const popupTitle = new Control(
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

  const popupType = new Control(
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

  const regTime = new Control(
    popup.node,
    'p',
    'popup__text popup__text--time',
    `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`
  );

  const popupFeatures = getPopupFeatures(offer.features);
  popup.node.append(popupFeatures.node);

  const popupDescription = new Control(
    popup.node,
    'p',
    'popup__description',
    offer.description
  );

  const popupPhotos = getPopupPhotos(offer.photos);
  popup.node.append(popupPhotos.node);

  const hidableElems = [
    [popupAvatar, author.avatar],
    [popupTitle, offer.title],
    [popupTextAddress, offer.address],
    [popupTextPrice, offer.price],
    [popupType, offer.type],
    [roomCapacity, offer.rooms, offer.guests],
    [regTime, offer.checkin, offer.checkout],
    [popupPhotos, offer.checkin, offer.checkout],
    [popupFeatures, offer.features],
    [popupDescription, offer.description],
    [popupPhotos, offer.photos],
  ];

  hideEmpty(hidableElems);

  return card;
};

const getCardsNodesArr = (cardsDataArr) => {
  const cardsNodesArr = [];
  cardsNodesArr.length = cardsDataArr.length;

  cardsDataArr.forEach((cardDataItem, index) => {
    const cardNode = getCard(cardDataItem).node;
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
