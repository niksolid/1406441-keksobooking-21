'use strict';

(() => {
  window.openPopupOffer = (pins) => {
    const choosenPins = window.mapPins.querySelectorAll(`.map__pin`)

    console.log(choosenPins)

    choosenPins.addEventListener(`click`, (evt) => {
      const target = evt.target
      console.log(target)
      evt.preventDefault();

      if (evt.button === window.evtButtons.mouseLeftBtn) {

      }
    });

  };
})();
