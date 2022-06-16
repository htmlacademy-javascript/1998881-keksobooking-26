import { getCardsArr } from './modules/data.js';

const main = () => {
  CARDS_COUNT = 10;
  const cardsArr = getCardsArr(CARDS_COUNT);
  console.log('cardsArr: ', cardsArr);
};
main();
