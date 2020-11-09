'use strict';

(() => {
  window.openPopupOffer = (pins) => {

    const openPopup = (evt) => {
      evt.preventDefault();

      window.mapPins.append(window.util.getFragment(currentPins, renderPlacesNearby));

      const currentTarget = evt.target;
      if (!(currentTarget.closest(`.map__pin--main`))) {
        if (evt.button === window.evtButtons.mouseLeftBtn) {
          console.log(currentTarget.parentElement)
          const evtElement = currentTarget.parentElement;
          window.mapPins.after(window.util.getFragment(pins[0], window.renderPinPopup));
        }
      }
    };

    window.mapPins.addEventListener(`click`, openPopup);

  };
})();
