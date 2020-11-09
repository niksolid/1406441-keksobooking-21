'use strict';

(() => {

  window.map = document.querySelector(`.map`);
  window.mapPins = window.map.querySelector(`.map__pins`);
  window.pinMain = window.mapPins.querySelector(`.map__pin--main`);

  const pinTemplate = document.querySelector(`#pin`).content;
  const cardTemplate = document.querySelector(`#card`).content;

  // const getUtilRandomNumber = (min, max) => {
  //   const rand = min - 0.5 + Math.random() * (max - min + 1);
  //   return Math.round(rand);
  // };

  // const getUtilRandomElementArray = (array) => {
  //   return array[Math.floor(array.length * Math.random())];
  // };

  // const getUtilRandomArray = (array) => {
  //   const arrayCopy = array.slice();
  //   const quantiyDeletedItem = window.util.getRandomNumber(0, array.length - 1);
  //   for (let i = 0; i < quantiyDeletedItem; i++) {
  //     const arrayCopyElement = window.util.getRandomElementArray(arrayCopy);
  //     arrayCopy.splice(arrayCopy.indexOf(arrayCopyElement), 1);
  //   }
  //   return arrayCopy;
  // };

  // const getUtilRandomLocation = () => {
  //   return {
  //     x: window.util.getRandomNumber(0, mapWidth),
  //     y: window.util.getRandomNumber(130, 630)
  //   };
  // };


  const utilPlacePins = () => {

    const pins = window.shownPins.querySelectorAll(`.map__pin`)
    console.log(pins)
    console.log(window.shownPins)
    pins.forEach((pin) => {
      console.log('a')
      pin.classList.add(`map__pin--shown`)
      window.mapPins.append(pin);
    });
  };

  const utilRemovePins = () => {
    const pins = window.mapPins.querySelectorAll(`.map__pin--shown`)
    pins.forEach((pin) => {
      pin.classList.remove(`map__pin--shown`);
      window.shownPins.append(pin);
    });
  };



  const getUtilFragment = (pins, renderDOM) => {
    const fragment = document.createDocumentFragment();
    //изменить цикл (макс 5 значений, сортировка по критериям)
    pins.forEach((pin) => {
      fragment.append(renderDOM(pin));
    });

    return fragment;
  };

  const utilToggleState = (domElement, isActive) => {
    if (isActive) {
      domElement.removeAttribute(`disabled`);
    } else {
      domElement.setAttribute(`disabled`, true);
    }
  };

  // const utilClosestItemByClass = (item, className) {
  //   while(item) {
  //     if (item.classList.contains(className)) {
  //       return item;
  //     }

  //     item = item.parentElement;
  //   }
  // };

  window.templates = {
    cardPopup: cardTemplate.querySelector(`.popup`),
    pinMapTemplate: pinTemplate.querySelector(`.map__pin`)
  };
  window.util = {
    // getRandomNumber: getUtilRandomNumber,
    // getRandomElementArray: getUtilRandomElementArray,
    // getRandomArray: getUtilRandomArray,
    // getRandomLocation: getUtilRandomLocation,
    placePins: utilPlacePins,
    removePins: utilRemovePins,
    getFragment: getUtilFragment,
    toggleState: utilToggleState
  };
})();
