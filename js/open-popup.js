'use strict';

(() => {

  const popupEvents = () => {
    const mapCard = window.map.querySelector(`.map__card`);
    if (mapCard) {
      const popupClose = mapCard.querySelector(`.popup__close`);

      popupClose.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        if (evt.button === window.evtButtons.mouseLeftBtn) {
          window.util.closePopup();
        }
      });

      window.map.addEventListener(`keydown`, (evt) => {
        if (evt.keyCode === window.evtButtons.keyEsc) {
          window.util.closePopup();
        }
      });
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

    if (evt.button === window.evtButtons.mouseLeftBtn) {
      const target = evt.target.closest(`.map__pin--shown`);
      openPopup(target);
    }
  });

})();
