'use strict';

(() => {

  window.pageState(false);

  window.mapFilters.addEventListener(`input`, () => {
    window.util.closePopup();
    window.renderPins();
    // window.util.placePins();
    window.util.debounce(window.util.placePins);
  });

 })();
