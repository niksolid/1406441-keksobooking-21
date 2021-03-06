'use strict';

(() => {
  const DEBOUNCE_INTERVAL = 500;

  window.page = document.querySelector(`body`);
  window.map = document.querySelector(`.map`);
  window.mapPins = window.map.querySelector(`.map__pins`);
  window.pinMain = window.mapPins.querySelector(`.map__pin--main`);
  window.mapFilters = window.map.querySelector(`.map__filters`);

  const pinTemplate = document.querySelector(`#pin`).content;
  const cardTemplate = document.querySelector(`#card`).content;
  const successTemplate = document.querySelector(`#success`).content;
  const errorTemplate = document.querySelector(`#error`).content;

  window.evtButton = {
    MOUSE_LEFT_BTN: 0,
    KEY_ENTER: 13,
    KEY_ESC: 27
  };

  window.pinType = {
    value: {
      flat: `flat`,
      bungalow: `bungalow`,
      house: `house`,
      palace: `palace`
    },
    content: {
      flat: `Квартира`,
      bungalow: `Бунгало`,
      house: `Дом`,
      palace: `Дворец`
    }
  };

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

  const utilGetFragment = (pins, renderDOM) => {
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
      document.removeEventListener(`keydown`, window.pinCloseHandler);
    }
  };

  const utilEventRemoveElement = (domElement) => {
    const clickRemoveHandler = (evt) => {
      if (evt.button === window.evtButton.MOUSE_LEFT_BTN) {
        evt.preventDefault();
        const target = evt.currentTarget;
        if (target) {
          domElement.remove();
          domElement.removeEventListener(`click`, clickRemoveHandler);
          document.removeEventListener(`keydown`, keydownRemoveHandler);
        }
      }
    };

    const keydownRemoveHandler = (evt) => {
      if (evt.keyCode === window.evtButton.KEY_ESC || evt.keyCode === window.evtButton.KEY_ENTER) {
        evt.preventDefault();
        domElement.remove();
        domElement.addEventListener(`click`, clickRemoveHandler);
        document.removeEventListener(`keydown`, keydownRemoveHandler);
      }
    };

    domElement.addEventListener(`click`, clickRemoveHandler);
    document.addEventListener(`keydown`, keydownRemoveHandler);
  };

  let lastTimeout;
  const utilDebounce = ((cb) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  });

  window.templates = {
    cardPopup: cardTemplate.querySelector(`.popup`),
    pinMapTemplate: pinTemplate.querySelector(`.map__pin`),
    success: successTemplate.querySelector(`.success`),
    error: errorTemplate.querySelector(`.error`)
  };

  window.util = {
    closePopup: utilClosePopup,
    placePins: utilPlacePins,
    removePins: utilRemovePins,
    getFragment: utilGetFragment,
    toggleState: utilToggleState,
    eventRemoveElement: utilEventRemoveElement,
    debounce: utilDebounce
  };
})();
