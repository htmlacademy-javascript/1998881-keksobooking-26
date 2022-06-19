import { getCardsArr } from './modules/data.js';
import { updateMarkup } from './modules/updateMarkup.js';

const main = () => {
  const CARDS_COUNT = 10;
  const cardsArr = getCardsArr(CARDS_COUNT);
  updateMarkup();
};
main();
