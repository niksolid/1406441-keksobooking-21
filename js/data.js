'use strict';

(() => {
  // const TYPES_OF_HOUSING = [`place`, `flat`, `house`, `bungalow`];
  // const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
  // const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  // const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const PIN_OFFSET_X = 50;
  const PIN_OFFSET_Y = 70;

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
      pins.push(elements[i]);
    }
    return pins;
  };

  const sucsessHandler = (pins) => {
    window.pinsData = pins
    window.shownPins = document.createDocumentFragment();

    const currentPins = getPinsNearby(pins);
    window.shownPins.append(window.util.getFragment(currentPins, renderPlacesNearby));
    const fragmentPins = window.shownPins.querySelectorAll(`.map__pin`)
    fragmentPins.forEach((pin, i) => {
      pin.classList.add(`map__pin--${i}`)
    });


    // window.renderPins = () => {









      // window.mapPins.append(window.util.getFragment(currentPins, renderPlacesNearby));
      // window.mapPins.after(window.util.getFragment([currentPins[4]], window.renderPinPopup));
      // window.renderPinPopup(currentPins[1]);
    // };
  }

  window.loadData(sucsessHandler, errorHandler)
  window.loadData(sucsessHandler, errorHandler)

})();
