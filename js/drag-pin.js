'use strict';

(() => {
  const minHeight = 130;
  const maxHeight = 630;
  const mapWidth = window.map.offsetWidth;
  const minWidth = 0;
  window.evtButtons = {
    mouseLeftBtn: 0,
    keyEnter: 13
  }
  const pinMainShift = window.pinMain.offsetWidth / 2;

  window.pinMain.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();

    if (evt.button === window.evtButtons.mouseLeftBtn) {
      window.pageState(true);
      window.util.removePins();
      // const displayedPins = window.mapPins.querySelectorAll(`.map__pin`)
      // displayedPins.forEach((pin) => {
      //   if (!(pin.closest(`.map__pin--main`))) {
      //     pin.remove();
      //   }
      // });



      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      let dragged = false;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        window.formValid.getAddress(true);

        dragged = true;

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        let dragY = window.pinMain.offsetTop - shift.y;
        let dragX = window.pinMain.offsetLeft - shift.x;

        if (dragY < minHeight) {
          dragY = minHeight;
        } else if (dragY > maxHeight) {
          dragY = maxHeight;
        }

        if (dragX < minWidth - pinMainShift) {
          dragX = minWidth - pinMainShift;
        } else if (dragX > mapWidth - pinMainShift) {
          dragX = mapWidth - pinMainShift;
        }

        window.pinMain.style.top = dragY + `px`;
        window.pinMain.style.left = dragX + `px`;
      };

      const onMouseUp = (upEvt) => {
        upEvt.preventDefault();

        document.removeEventListener(`mousemove`, onMouseMove);
        document.removeEventListener(`mouseup`, onMouseUp);

        window.util.placePins();
        window.formValid.getAddress(true);

        if (dragged) {
          const onClickPreventDefault = (clickEvt) => {
            clickEvt.preventDefault();
            window.pinMain.removeEventListener(`click`, onClickPreventDefault);
          };
          window.pinMain.addEventListener(`click`, onClickPreventDefault);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);

    }
  });

  window.pinMain.addEventListener(`keydown`, (evt) => {
    evt.preventDefault();
    if (evt.keyCode === window.evtButtons.keyEnter) {
      window.pageState(true);
      // window.renderPins();
    }
  });

})();
