'use strict';

(() => {

  window.map = document.querySelector(`.map`);
  window.mapPins = window.map.querySelector(`.map__pins`);
  window.pinMain = window.mapPins.querySelector(`.map__pin--main`);
  window.mapFilters = window.map.querySelector(`.map__filters`);

  const pinTemplate = document.querySelector(`#pin`).content;
  const cardTemplate = document.querySelector(`#card`).content;


  const utilPlacePins = () => {

    const pins = window.shownPins.querySelectorAll(`.map__pin`);
    pins.forEach((pin) => {
      pin.classList.add(`map__pin--shown`);
      window.mapPins.append(pin);
    });
  };

  const utilRemovePins = () => {
    window.util.closePopup();
    const pins = window.mapPins.querySelectorAll(`.map__pin--shown`);
    pins.forEach((pin) => {
      pin.classList.remove(`map__pin--shown`);
      window.shownPins.append(pin);
    });
  };

  const getUtilFragment = (pins, renderDOM) => {
    const fragment = document.createDocumentFragment();
    pins.forEach((pin) => {
      fragment.append(renderDOM(pin));
    });

    return fragment;
  };

  const utilToggleState = (domElement, isActive) => {
    if (isActive) {
      domElement.removeAttribute(`disabled`);
    } else {
      domElement.setAttribute(`disabled`, true);
    }
  };

  const utilClosePopup = () => {
    const mapCard = window.map.querySelector(`.map__card`);
    if (mapCard) {
      const activePin = window.mapPins.querySelector(`.map__pin--active`);
      activePin.classList.remove(`map__pin--active`);
      mapCard.remove();
    }
  };

    const DEBOUNCE_INTERVAL = 500;
    let lastTimeout;
  const utilDebounce = ((cb) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
    });

  window.templates = {
    cardPopup: cardTemplate.querySelector(`.popup`),
    pinMapTemplate: pinTemplate.querySelector(`.map__pin`)
  };

  window.util = {
    closePopup: utilClosePopup,
    placePins: utilPlacePins,
    removePins: utilRemovePins,
    getFragment: getUtilFragment,
    toggleState: utilToggleState,
    debounce: utilDebounce
  };
})();
