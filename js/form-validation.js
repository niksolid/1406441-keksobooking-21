'use strict';

(() => {
  const PIN_MAIN_SIZE = 65;
  const PIN_MAIN_SIZE_TIP = 19;
  const ONE_HUNDRED_ROOMS = 100;

  const addressInput = window.adForm.querySelector(`#address`);
  const capacityFragment = document.createDocumentFragment();

  window.getAddress = (isActive) => {
    let axisX = parseInt(window.pinMain.style.left, 10);
    let axisY = parseInt(window.pinMain.style.top, 10);
    axisX = Math.round(axisX + PIN_MAIN_SIZE / 2);
    if (isActive) {
      axisY = Math.floor(axisY + (PIN_MAIN_SIZE + PIN_MAIN_SIZE_TIP));
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


  const priceLimit = (minPrice) => {
    window.formData.price.min = minPrice;
    window.formData.price.placeholder = minPrice;
  };

  window.formData.roomNumber.addEventListener(`input`, () => {
    const value = window.formData.roomNumber.value;
    window.capacitySelection(value);
  });

  window.formData.type.addEventListener(`input`, () => {
    switch (window.formData.type.value) {
      case `bungalow`:
        priceLimit(0);
        break;
      case `flat`:
        priceLimit(1000);
        break;
      case `house`:
        priceLimit(5000);
        break;
      case `palace`:
        priceLimit(10000);
        break;
    }
  });

  window.timeSynсForm();

})();
