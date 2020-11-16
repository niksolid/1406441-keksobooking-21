'use strict';

(() => {




  const popupEvents = () => {
    const mapCard = window.map.querySelector(`.map__card`);
    if (mapCard) {
      const popupClose = mapCard.querySelector(`.popup__close`);

      const pinCloseHandler = (evt) => {

        if (evt.button === window.evtButtons.MOUSE_LEFT_BTN ||
          evt.keyCode === window.evtButtons.KEY_ESC) {
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
      for (let i = 0; i < targets.length; i++) {
        if (target.classList.contains(`map__pin--${i}`)) {
          targets[i].classList.add(`map__pin--active`);
          window.mapPins.after(window.util.getFragment([window.currentPinsObjects[i]], window.renderPinPopup));
        }
      }
    }

    popupEvents();
  };

  window.mapPins.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    if (evt.button === window.evtButtons.MOUSE_LEFT_BTN) {
      const target = evt.target.closest(`.map__pin--shown`);
      openPopup(target);
    }
  });

})();
