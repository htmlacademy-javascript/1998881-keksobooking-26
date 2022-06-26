import { getNodes, makeInactive } from './modules/toggleDisabled.js';
import { updateMarkup } from './modules/updateMarkup/updateMarkup.js';

const main = () => {
  updateMarkup();

  const nodesToToggle = getNodes();
  makeInactive(nodesToToggle);
};
main();
