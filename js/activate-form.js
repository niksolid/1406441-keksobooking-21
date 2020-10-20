'use strict';

(() => {
  const adFormFieldsets = window.adForm.querySelectorAll(`fieldset`);
  const mapFilters = window.map.querySelector(`.map__filters`);

  window.pageState = (isActive) => {
    if (isActive) {
      window.map.classList.remove(`map--faded`);
      window.adForm.classList.remove(`ad-form--disabled`);
    } else {
      window.map.classList.add(`map--faded`);
      window.adForm.classList.add(`ad-form--disabled`);
      window.formValid.getAddress(false);
      // параметры для будущей функции возврата в исходное состояние
      window.formValid.capacitySelection(window.roomNumber.value);
    }

    for (let i = 0; i < adFormFieldsets.length; i++) {
      window.util.toggleState(adFormFieldsets[i], isActive);
    }

    for (let i = 0; i < mapFilters.children.length; i++) {
      window.util.toggleState(mapFilters.children[i], isActive);
    }
  };

  window.pinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      window.pageState(true);
      window.renderPins();
      window.formValid.getAddress(true);
    }
  });

  window.pinMain.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 13) {
      window.pageState(true);
      window.renderPins();
    }
  });
})();
