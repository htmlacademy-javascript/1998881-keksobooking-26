import Control from "./util/Control";

const getCardsNodesArr = (cardsArr) => {
  const card = new Control('', 'template');
  card.setId(idStr);


  return cardsArr;
};

export const updateMarkup = (cardsArr) => {
  const mapCanvas = document.getElementById('map-canvas');
  const myCards = getCardsNodesArr(cardsArr);
  const testCard = myCards[0];
  mapCanvas.append(testCard);
};
