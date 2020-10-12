'use strict';

(() => {
  const TYPES_OF_HOUSING = [`place`, `flat`, `house`, `bungalow`];
  const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const PIN_OFFSET_X = 50;
  const PIN_OFFSET_Y = 70;

  const getPlacementData = (placementNumber) => {
    const placementLocation = window.util.getRandomLocation();
    return {
      author: {
        avatar: `img/avatars/user0${placementNumber}.png`
      },
      offer: {
        title: `Заголовок объявления`,
        address: `${placementLocation.x}, ${placementLocation.y}`,
        price: window.util.getRandomNumber(1, 100) * 100,
        type: window.util.getRandomElementArray(TYPES_OF_HOUSING),
        rooms: window.util.getRandomNumber(1, 7),
        guests: window.util.getRandomNumber(2, 20),
        checkin: window.util.getRandomElementArray(CHECK_TIMES),
        checkout: window.util.getRandomElementArray(CHECK_TIMES),
        features: window.util.getRandomArray(FEATURES),
        description: `Описание про Lorem ipsum dolor sit amet, consectetuer adipiscing elit...`,
        photos: window.util.getRandomArray(PHOTOS)
      },
      location: window.util.getRandomLocation()
    };
  };

  const renderPlacement = (pin) => {
    const pinElement = window.templates.pinMapTemplate.cloneNode(true);
    const pinImage = pinElement.querySelector(`img`);
    pinElement.style.top = pin.location.x;
    pinElement.style = `top: ${pin.location.y - PIN_OFFSET_Y}px; left: ${pin.location.x - (PIN_OFFSET_X / 2)}px;`;
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;

    return pinElement;
  };

  const getRandomPins = () => {
    const pins = [];
    for (let i = 1; i <= 8; i++) {
      pins.push(getPlacementData(i));
    }
    return pins;
  };

  window.renderPins = () => {
    const pins = getRandomPins();
    window.mapPins.append(window.util.getFragment(pins, renderPlacement));
    window.mapPins.after(window.util.getFragment(pins, window.renderPinPopup));
  };

})();
