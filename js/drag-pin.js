'use strict';

(() => {
  const minHeight = 130;
  const maxHeight = 630;
  const mapWidth = window.map.offsetWidth;
  const minWidth = 0;

  const pinMainShift = window.pinMain.offsetWidth / 2;

  window.pinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.button === window.evtButton.MOUSE_LEFT_BTN) {

      evt.preventDefault();

      window.pageState(true);
      window.util.removePins();

      let startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };
      let dragged = false;

      const onMouseMove = (moveEvt) => {
        moveEvt.preventDefault();
        window.getAddress(true);

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

        window.util.debounce(window.util.placePins);
        window.getAddress(true);

        if (dragged) {
          const onClickPreventDefaultHandler = (clickEvt) => {
            clickEvt.preventDefault();
            window.pinMain.removeEventListener(`click`, onClickPreventDefaultHandler);
          };
          window.pinMain.addEventListener(`click`, onClickPreventDefaultHandler);
        }
      };

      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);

    }
  });

  const onKeydown = (evt) => {
    if (evt.keyCode === window.evtButton.KEY_ENTER) {
      evt.preventDefault();
      window.pageState(true);
    }
  };

  window.pinMain.addEventListener(`keydown`, onKeydown);

})();
