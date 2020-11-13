'use strict';

(() => {
  const adFormFieldsets = window.adForm.querySelectorAll(`fieldset`);
  const mapFilters = window.map.querySelector(`.map__filters`);

  window.pageState = (isActive) => {
    if (isActive) {
      window.map.classList.remove(`map--faded`);
      window.adForm.classList.remove(`ad-form--disabled`);
      window.formValid.getAddress(true);
    } else {
      window.map.classList.add(`map--faded`);
      window.adForm.classList.add(`ad-form--disabled`);
      window.formValid.getAddress(false);
      window.util.removePins();
      // вызов функции возврата формы в исходное состояние
    }

    for (let i = 0; i < adFormFieldsets.length; i++) {
      window.util.toggleState(adFormFieldsets[i], isActive);
    }

    for (let i = 0; i < mapFilters.children.length; i++) {
      window.util.toggleState(mapFilters.children[i], isActive);
    }
  };

})();
