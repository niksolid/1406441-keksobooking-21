'use strict';

(() => {
  window.openPopupOffer = (pins) => {

    window.mapPins.addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.button === window.evtButtons.mouseLeftBtn) {
        const target = evt.target
        if (target.contains(`.map__pin--main`)) {
          console.log(target)
        }
      }
    });

  };
})();
