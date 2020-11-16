'use strict';

(() => {
  const PIN_OFFSET_X = 50;
  const PIN_OFFSET_Y = 70;
  const MAX_PINS_MAP = 5;

  const errorHandler = (errorMessage) => {
    const node = document.createElement(`div`);
    node.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red;`;
    node.style.position = `absolute`;
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = `30px`;
    node.textContent = errorMessage;
    document.body.insertAdjacentElement(`afterbegin`, node);
  };

  const renderPlacesNearby = (pin) => {
    const pinElement = window.templates.pinMapTemplate.cloneNode(true);
    const pinImage = pinElement.querySelector(`img`);
    pinElement.style.top = pin.location.x;
    pinElement.style = `top: ${pin.location.y - PIN_OFFSET_Y}px; left: ${pin.location.x - (PIN_OFFSET_X / 2)}px;`;
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;
    return pinElement;
  };

  const getPinsNearby = (elements) => {
    const pins = [];
    for (let i = 0; i < elements.length; i++) {
      if (elements[i].offer) {
        pins.push(elements[i]);
        if (pins.length === MAX_PINS_MAP) {
          break;
        }
      }
    }
    return pins;
  };

  const renumberPins = () => {
    const fragmentPins = window.shownPins.querySelectorAll(`.map__pin`);
    fragmentPins.forEach((pin, i) => {
      pin.classList.add(`map__pin--${i}`);
    });
  };

  window.renderPins = () => {
    window.util.removePins();
    window.shownPins = document.createDocumentFragment();
    const pinsObjects = window.filteredPins(window.pinsData.slice());
    window.currentPinsObjects = getPinsNearby(pinsObjects);
    window.shownPins.append(window.util.getFragment(window.currentPinsObjects, renderPlacesNearby));
    renumberPins();
  };

  const sucsessHandler = (pinsObjects) => {
    window.pinsData = pinsObjects;
    window.renderPins();
  };

  window.loadData(sucsessHandler, errorHandler);


})();
