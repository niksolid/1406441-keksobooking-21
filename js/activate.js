'use strict';

(() => {
  const adFormFieldsets = window.adForm.querySelectorAll(`fieldset`);
  const formReset = window.adForm.querySelector(`.ad-form__reset`);

  const replacePins = () => {
    window.util.closePopup();
    window.renderPins();
    window.util.placePins();
  };

  const mapFiltersHandler = (evt) => {
    evt.preventDefault();

    window.util.debounce(replacePins);
  };

  const pageResetHandler = (evt) => {
    evt.preventDefault();

    window.util.closePopup();
    window.renderPins();
    pageState(false);
  };

  const pageState = (isActive) => {
    if (isActive) {
      window.map.classList.remove(`map--faded`);
      window.adForm.classList.remove(`ad-form--disabled`);
      window.getAddress(true);
      window.mapFilters.addEventListener(`input`, mapFiltersHandler);
      formReset.addEventListener(`click`, pageResetHandler);

    } else {

      window.map.classList.add(`map--faded`);
      window.adForm.classList.add(`ad-form--disabled`);
      window.returnPageForm();
      window.renderPins();
      window.util.removePins();
      window.getAddress(false);
      window.mapFilters.removeEventListener(`input`, mapFiltersHandler);
      formReset.removeEventListener(`click`, pageResetHandler);
    }

    for (let i = 0; i < adFormFieldsets.length; i++) {
      window.util.toggleState(adFormFieldsets[i], isActive);
    }

    for (let i = 0; i < window.mapFilters.children.length; i++) {
      window.util.toggleState(window.mapFilters.children[i], isActive);
    }
  };

  pageState(false);

  window.activate = {
    pageState: pageState,
  }
})();
