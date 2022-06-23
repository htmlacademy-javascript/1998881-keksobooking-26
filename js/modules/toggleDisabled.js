export const getNodes = () => {
  const adFormNode = document.querySelector('.ad-form');
  const mapfiltersNode = document.querySelector('.map__filters');
  const children = [...adFormNode.children, ...mapfiltersNode.children];

  return [adFormNode, mapfiltersNode, children];
};

const updateClasses = (nodesToToggle, operation) => {
  const [adFormNode, mapfiltersNode, children] = nodesToToggle;

  adFormNode.classList[operation]('ad-form--disabled');
  mapfiltersNode.classList[operation]('map__filters--disabled');

  children.forEach((node) => {
    node.classList[operation]('disabled');
  });
};

export const makeInactive = (nodesToToggle) => {
  updateClasses(nodesToToggle, 'add');
};

export const makeActive = (nodesToToggle) => {
  updateClasses(nodesToToggle, 'remove');
};
