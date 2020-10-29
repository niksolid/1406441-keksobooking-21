'use strict';

(() => {
  window.pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    const shift = {

    }
    if (evt.button === 0) {
      // window.delitePins() - еще не написана
      window.pageState(true);
    }
  });

  window.pinMain.addEventListener(`mouseup`, (evt) => {

    if (evt.button === 0) {
      window.renderPins();
      window.formValid.getAddress(true);
    }
  });

  window.pinMain.addEventListener(`keydown`, (evt) => {
    evt.preventDefault();
    if (evt.keyCode === 13) {
      window.pageState(true);
      window.renderPins();
    }
  });

})();
