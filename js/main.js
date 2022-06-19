import { getCardsDataArr } from './modules/data.js';
import { updateMarkup } from './modules/updateMarkup.js';

const main = () => {
  const CARDS_COUNT = 10;
  const cardsDataArr = getCardsDataArr(CARDS_COUNT);
  updateMarkup(cardsDataArr);
};
main();
