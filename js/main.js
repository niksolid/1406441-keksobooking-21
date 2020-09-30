'use strict';

(function () {

  const TYPES_OF_HOUSING = [`place`, `flat`, `house`, `bungalow`];
  const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const PIN_OFFSET_X = 50;
  const PIN_OFFSET_Y = 70;

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapWidth = mapPins.offsetWidth;

  const pinTemplate = document.querySelector(`#pin`).content;
  const pinMapTemplate = pinTemplate.querySelector(`.map__pin`);

  const getRandomNumber = (min, max) => {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  const getRandomElementArray = (array) => {
    return array[Math.floor(array.length * Math.random())];
  };

  const getRandomArray = (array) => {
    const arrayCopy = array.slice();
    const quantiyDeletedItem = getRandomNumber(0, FEATURES.length - 1);
    for (let i = 0; i < quantiyDeletedItem; i++) {
      let arrayCopyElement = getRandomElementArray(arrayCopy);
      arrayCopy.splice(arrayCopy.indexOf(arrayCopyElement), 1)
    }
    return arrayCopy;
  }

  const getRandomLocation = () => {
    return {
      x: getRandomNumber(0, mapWidth),
      y: getRandomNumber(130, 630)
    };
  };

  const getPlacementData = (placementNumber) => {
    const placementLocation = getRandomLocation()
    return {
      author: {
        avatar: `img/avatars/user0${placementNumber}.png`
      },
      offer: {
        title: `Заголовок объявления`,
        address: `${placementLocation.x}, ${placementLocation.y}`,
        price: getRandomNumber(1, 100) * 100,
        type: getRandomElementArray(TYPES_OF_HOUSING),
        rooms: getRandomNumber(1, 7),
        guests: getRandomNumber(2, 20),
        checkin: getRandomElementArray(CHECK_TIMES),
        checkout: getRandomElementArray(CHECK_TIMES),
        features: getRandomArray(FEATURES),
        description: `Описание про Lorem ipsum dolor sit amet, consectetuer adipiscing elit...`,
        photos: getRandomArray(PHOTOS)
      },
      location: getRandomLocation()
    }
  };

  const renderPlacement = (pin) => {
    const pinElement = pinMapTemplate.cloneNode(true);
    const pinImage = pinElement.querySelector(`img`);
    pinElement.style.top = pin.location.x;
    pinElement.style = `top: ${pin.location.y - PIN_OFFSET_Y}px; left: ${pin.location.x - (PIN_OFFSET_X / 2)}px;`;
    pinImage.src = pin.author.avatar;
    pinImage.alt = pin.offer.title;

    return pinElement;
  };

  const getFragment = (fragmentItems) => {
    const fragment = document.createDocumentFragment();
    fragmentItems.forEach(item => {
      fragment.appendChild(renderPlacement(fragmentItems[item]));
    });
    for (let i = 0; i < fragmentItems.length; i++) {
      fragment.appendChild(renderPlacement(fragmentItems[i]));
    }
    return fragment;
  }

  const getRandomPins = () => {
    const pins = [];
    for (let i = 1; i <= 8; i++) {
      pins.push(getPlacementData(i));
    }
    return pins;
  }

  const pins = getRandomPins();
  mapPins.appendChild(getFragment(pins));

  map.classList.remove('map--faded');
})();
