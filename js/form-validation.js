'use strict';

(() => {
  const PIN_MAIN_SIZE = 65;
  const PIN_MAIN_SIZE_TIP = 19;
  const ONE_HUNDRED_ROOMS = 100;

  const addressInput = window.adForm.querySelector(`#address`);
  const capacityFragment = document.createDocumentFragment();

  window.PIN_MAIN_HEIGHT = PIN_MAIN_SIZE + PIN_MAIN_SIZE_TIP

  const minPrice = {
    bungalow: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  window.getAddress = (isActive) => {
    let axisX = parseInt(window.pinMain.style.left, 10);
    let axisY = parseInt(window.pinMain.style.top, 10);
    axisX = Math.round(axisX + PIN_MAIN_SIZE / 2);
    if (isActive) {
      axisY = Math.floor(axisY + (window.PIN_MAIN_HEIGHT));
    } else {
      axisY = Math.floor(axisY + (PIN_MAIN_SIZE / 2));
    }
    addressInput.value = (`${axisX}, ${axisY}`);
  };

  const transferCapacityItem = (item, roomValue) => {
    if (+roomValue === ONE_HUNDRED_ROOMS && +item.value !== 0) {
      capacityFragment.append(item);
    } else if (+item.value > +roomValue) {
      capacityFragment.append(item);
    } else if (+item.value === 0 && +roomValue !== ONE_HUNDRED_ROOMS) {
      capacityFragment.append(item);
    }
  };

  window.capacitySelection = (roomValue) => {
    window.capacity.appendChild(capacityFragment);
    const options = window.capacity.querySelectorAll(`option`);
    options.forEach((item) => {
      transferCapacityItem(item, roomValue);
    });
  };

  const priceLimit = (price) => {
    window.formData.price.min = price;
    window.formData.price.placeholder = price;
  };

  window.formData.roomNumber.addEventListener(`input`, () => {
    const value = window.formData.roomNumber.value;
    window.capacitySelection(value);
  });

  window.formData.type.addEventListener(`input`, () => {
    switch (window.formData.type.value) {
      case window.pinType.value.bungalow:
        priceLimit(minPrice.bungalow);
        break;
      case window.pinType.value.flat:
        priceLimit(minPrice.flat);
        break;
      case window.pinType.value.house:
        priceLimit(minPrice.house);
        break;
      case window.pinType.value.palace:
        priceLimit(minPrice.palace);
        break;
    }
  });

  window.timeSynсForm();

})();
