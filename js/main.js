'use strict';

(function () {

  const TYPES_OF_HOUSING = [`place`, `flat`, `house`, `bungalow`];
  const CHECK_TIMES = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
  const PHOTOS = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];
  const PIN_OFFSET_X = 50;
  const PIN_OFFSET_Y = 70;
  // const defaultParamets = {
  //   pinMain: {
  //     x: 570,
  //     y: 350
  //   },
  //   roomNumber: 1,
  //   capacity: 1,
  // };

  const map = document.querySelector(`.map`);
  const mapPins = map.querySelector(`.map__pins`);
  const mapWidth = mapPins.offsetWidth;

  const pinTemplate = document.querySelector(`#pin`).content;
  const pinMapTemplate = pinTemplate.querySelector(`.map__pin`);
  const cardTemplate = document.querySelector(`#card`).content;
  const cardPopup = cardTemplate.querySelector(`.popup`);

  const getRandomNumber = (min, max) => {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  };

  const getRandomElementArray = (array) => {
    return array[Math.floor(array.length * Math.random())];
  };

  const getRandomArray = (array) => {
    const arrayCopy = array.slice();
    const quantiyDeletedItem = getRandomNumber(0, FEATURES.length - 1);
    for (let i = 0; i < quantiyDeletedItem; i++) {
      const arrayCopyElement = getRandomElementArray(arrayCopy);
      arrayCopy.splice(arrayCopy.indexOf(arrayCopyElement), 1);
    }
    return arrayCopy;
  };

  const getRandomLocation = () => {
    return {
      x: getRandomNumber(0, mapWidth),
      y: getRandomNumber(130, 630)
    };
  };

  const getPlacementData = (placementNumber) => {
    const placementLocation = getRandomLocation();
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
    };
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

  const getRandomPins = () => {
    const pins = [];
    for (let i = 1; i <= 8; i++) {
      pins.push(getPlacementData(i));
    }
    return pins;
  };

  const getFragment = (pins, renderDOM) => {
    const fragment = document.createDocumentFragment();
    pins.forEach((pin) => {
      fragment.append(renderDOM(pin));
    });

    return fragment;
  };

  const renderPinPopup = (pin) => {
    const popup = cardPopup.cloneNode(true);
    const popupAvatar = popup.querySelector(`.popup__avatar`);
    const popupTitle = popup.querySelector(`.popup__title`);
    const popupAddress = popup.querySelector(`.popup__text--address`);
    const popupPrice = popup.querySelector(`.popup__text--price`);
    const popupType = popup.querySelector(`.popup__type`);
    const popupCapacity = popup.querySelector(`.popup__text--capacity`);
    const popupTime = popup.querySelector(`.popup__text--time`);
    const popupFeatures = popup.querySelector(`.popup__features`);
    const popupDescription = popup.querySelector(`.popup__description`);
    const popupPhotos = popup.querySelector(`.popup__photos`);

    const replaceFeature = (popupChild) => {
      pin.offer.features.forEach((item) => {
        popupChild.append(popupFeatures.querySelector(`.popup__feature--${item}`));
      });
      return popupChild;
    };
    const replacePhoto = (popupChild) => {
      pin.offer.photos.forEach((item) => {
        const popupPhoto = popupPhotos.querySelector(`.popup__photo`).cloneNode(true);
        popupPhoto.src = item;
        popupChild.append(popupPhoto);
      });
      return popupChild;
    };

    const replaceChildrens = (popupParent, replaceFunction) => {
      const popupChild = popupParent.cloneNode(false);
      replaceFunction(popupChild);
      popupParent.replaceWith(popupChild);
    };

    popupAvatar.src = pin.author.avatar;
    popupTitle.textContent = pin.offer.title;
    popupAddress.textContent = pin.offer.address;
    popupPrice.textContent = `${pin.offer.price}₽/ночь`;
    switch (pin.offer.type) {
      case `flat`:
        popupType.textContent = `Квартира`;
        break;
      case `bungalow`:
        popupType.textContent = `Бунгало`;
        break;
      case `house`:
        popupType.textContent = `Дом`;
        break;
      case `place`:
        popupType.textContent = `Дворец`;
        break;
    }
    popupCapacity.textContent = `${pin.offer.rooms} комнаты для ${pin.offer.guests} гостей`;
    popupTime.textContent = `Заезд после ${pin.offer.checkin}, выезд до ${pin.offer.checkout}`;
    replaceChildrens(popupFeatures, replaceFeature);
    replaceChildrens(popupPhotos, replacePhoto);
    popupDescription.textContent = pin.offer.description;

    return popup;
  };

  const renderPins = () => {
    const pins = getRandomPins();
    mapPins.append(getFragment(pins, renderPlacement));
    mapPins.after(getFragment(pins, renderPinPopup));
  };

  const pinMain = mapPins.querySelector(`.map__pin--main`);
  const adForm = document.querySelector(`.ad-form`);
  const adFormFieldsets = adForm.querySelectorAll(`fieldset`);
  const mapFilters = map.querySelector(`.map__filters`);
  const addressInput = adForm.querySelector(`#address`);
  // const mapFilterSelect = map.querySelectorAll(`.map__filter`);
  // const mapFilterFieldset = map.querySelector(`.map__features`);

  const toggleState = (domElement, isActive) => {
    if (isActive) {
      domElement.removeAttribute(`disabled`);
    } else {
      domElement.setAttribute(`disabled`, true);
    }
  };

  const pageState = (isActive) => {
    if (isActive) {
      map.classList.remove(`map--faded`);
      adForm.classList.remove(`ad-form--disabled`);
    } else {
      map.classList.add(`map--faded`);
      adForm.classList.add(`ad-form--disabled`);
      getAddress();
      // параметры для будущей функции возврата в исходное состояние
      capacitySelection(roomNumber.value);
    }

    for (let i = 0; i < adFormFieldsets.length; i++) {
      toggleState(adFormFieldsets[i], isActive);
    }

    for (let i = 0; i < mapFilters.children.length; i++) {
      toggleState(mapFilters.children[i], isActive);
    }
  };

  const PIN_MAIN_SIZE = 65;
  const PIN_MAIN_SIZE_TIP = 22;

  const getAddress = (isActive) => {
    let axisX = parseInt(pinMain.style.left, 10);
    let axisY = parseInt(pinMain.style.top, 10);
    axisX = Math.floor(axisX + PIN_MAIN_SIZE / 2);
    if (isActive) {
      axisY = Math.floor(axisY + (PIN_MAIN_SIZE + PIN_MAIN_SIZE_TIP));
    } else {
      axisY = Math.floor(axisY + (PIN_MAIN_SIZE / 2));
    }
    addressInput.value = (`${axisX}, ${axisY}`);
  };

  const roomNumber = adForm.querySelector(`#room_number`);
  const capacity = adForm.querySelector(`#capacity`);
  const capacityFragment = document.createDocumentFragment();

  const transferCapacityItem = (item, roomValue) => {
    if (+roomValue === 100 && +item.value !== 0) {
      capacityFragment.append(item);
    } else if (+item.value > +roomValue) {
      capacityFragment.append(item);
    } else if (+item.value === 0 && +roomValue !== 100) {
      capacityFragment.append(item);
    }
  };

  const capacitySelection = (roomValue) => {
    capacity.appendChild(capacityFragment);
    const options = capacity.querySelectorAll(`option`);
    options.forEach((item) => {
      transferCapacityItem(item, roomValue);
    });
  };

  roomNumber.addEventListener(`input`, () => {
    const value = roomNumber.value;
    capacitySelection(value);
  });

  pinMain.addEventListener(`mousedown`, (evt) => {
    if (evt.button === 0) {
      pageState(true);
      renderPins();
      getAddress(true);
    }
  });

  pinMain.addEventListener(`keydown`, (evt) => {
    if (evt.keyCode === 13) {
      pageState(true);
      renderPins();
    }
  });

  pageState(false);

})();
