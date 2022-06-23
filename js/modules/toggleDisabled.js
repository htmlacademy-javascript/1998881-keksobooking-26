export const getNodes = () => {
  const adFormNode = document.querySelector('.ad-form');
  const mapFiltersNode = document.querySelector('.map__filters');
  const children = [...adFormNode.children, ...mapFiltersNode.children];

  return [adFormNode, mapFiltersNode, children];
};

const updateClasses = (nodesToToggle, operation) => {
  const [adFormNode, mapFiltersNode, children] = nodesToToggle;

  adFormNode.classList[operation]('ad-form--disabled');
  mapFiltersNode.classList[operation]('map__filters--disabled');

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
