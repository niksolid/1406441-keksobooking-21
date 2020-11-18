'use strict';

(() => {

  const popupEvents = () => {
    const mapCard = window.map.querySelector(`.map__card`);
    if (mapCard) {
      const popupClose = mapCard.querySelector(`.popup__close`);

      window.pinCloseHandler = (evt) => {

        if (evt.button === window.evtButton.MOUSE_LEFT_BTN ||
          evt.keyCode === window.evtButton.KEY_ESC) {
          window.util.closePopup();
          popupClose.removeEventListener(`click`, window.pinCloseHandler);
          document.removeEventListener(`keydown`, window.pinCloseHandler);
        }
      };

      popupClose.addEventListener(`click`, window.pinCloseHandler);
      document.addEventListener(`keydown`, window.pinCloseHandler);
    }
  };

  const openPopup = (target) => {
    const targets = window.mapPins.querySelectorAll(`.map__pin--shown`);
    if (target) {
      console.log(target)
      window.util.closePopup();
      const targetNum = +target.getAttribute(`map-displayed`);
      targets[targetNum].classList.add(`map__pin--active`);
      window.mapPins.after(window.util.getFragment([window.currentPinsObjects[targetNum]], window.renderPinPopup));
      document.removeEventListener(`keydown`, window.pinCloseHandler);
    }

    document.removeEventListener(`keydown`, window.pinCloseHandler);
    popupEvents();
  };

  window.popupClickHandler = (evt) => {
    if (evt.button === window.evtButton.MOUSE_LEFT_BTN) {
      evt.preventDefault();
      const target = evt.target.closest(`.map__pin--shown`);
      console.log.target
      openPopup(target);
    }
  };

  window.mapPins.addEventListener(`click`, popupClickHandler)

})();
