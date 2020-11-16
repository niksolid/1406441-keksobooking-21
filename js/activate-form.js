'use strict';

(() => {
  const adFormFieldsets = window.adForm.querySelectorAll(`fieldset`);
  const mapFilters = window.map.querySelector(`.map__filters`);
  const formReset = window.adForm.querySelector(`.ad-form__reset`);

  const mapFiltersHandler = (evt) => {
    evt.preventDefault();

    window.util.closePopup();
    window.renderPins();
    window.util.debounce(window.util.placePins);
  };

  const pageResetHandler = (evt) => {
    evt.preventDefault();

    window.util.closePopup();
    window.renderPins();
    window.pageState(false);
  };

  window.pageState = (isActive) => {
    if (isActive) {
      window.map.classList.remove(`map--faded`);
      window.adForm.classList.remove(`ad-form--disabled`);
      window.getAddress(true);
      window.mapFilters.addEventListener(`input`, mapFiltersHandler);
      formReset.addEventListener(`click`, pageResetHandler);

    } else {

      window.map.classList.add(`map--faded`);
      window.adForm.classList.add(`ad-form--disabled`);
      window.util.removePins();
      window.returnPageForm();
      window.getAddress(false);
      window.renderPins();
      window.mapFilters.removeEventListener(`input`, mapFiltersHandler);
      formReset.removeEventListener(`click`, pageResetHandler);
    }

    for (let i = 0; i < adFormFieldsets.length; i++) {
      window.util.toggleState(adFormFieldsets[i], isActive);
    }

    for (let i = 0; i < mapFilters.children.length; i++) {
      window.util.toggleState(mapFilters.children[i], isActive);
    }
  };

  window.pageState(false);

})();
