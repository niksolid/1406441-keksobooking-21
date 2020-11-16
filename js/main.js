'use strict';

(() => {
  const formReset = window.adForm.querySelector(`.ad-form__reset`)

  window.pageState(false);

  window.mapFilters.addEventListener(`input`, () => {
    window.util.closePopup();
    window.renderPins();
    window.util.debounce(window.util.placePins);
  });

  formReset.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    window.pageState(false);
  })


})();
