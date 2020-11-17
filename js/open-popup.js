'use strict';

(() => {

  const popupEvents = () => {
    const mapCard = window.map.querySelector(`.map__card`);
    if (mapCard) {
      const popupClose = mapCard.querySelector(`.popup__close`);

      const pinCloseHandler = (evt) => {

        if (evt.button === window.evtButton.MOUSE_LEFT_BTN ||
          evt.keyCode === window.evtButton.KEY_ESC) {
          window.util.closePopup();
          popupClose.removeEventListener(`click`, pinCloseHandler);
          popupClose.removeEventListener(`keydown`, pinCloseHandler);
        }
      };

      popupClose.addEventListener(`click`, pinCloseHandler);
      document.addEventListener(`keydown`, pinCloseHandler);
    }
  };

  const openPopup = (target) => {
    const targets = window.mapPins.querySelectorAll(`.map__pin--shown`);
    if (target) {
      window.util.closePopup();
      const targetNum = +target.getAttribute(`map-displayed`);
      targets[targetNum].classList.add(`map__pin--active`);
      window.mapPins.after(window.util.getFragment([window.currentPinsObjects[targetNum]], window.renderPinPopup));
    }

    popupEvents();
  };

  window.mapPins.addEventListener(`click`, (evt) => {
    if (evt.button === window.evtButton.MOUSE_LEFT_BTN) {
      evt.preventDefault();
      const target = evt.target.closest(`.map__pin--shown`);
      openPopup(target);
    }
  });

})();
